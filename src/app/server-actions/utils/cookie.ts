import 'server-only'

import { CookieKeys } from '@/constants/cookie'
import { logger } from '@/utils/server/logger'
import { cookies } from 'next/headers'
import { decodeJwt } from 'jose'

const GLOBAL_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 // 30 days
const ONBOARDING_COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 365 days

// TODO: Decrypt the global token
export async function setGlobalTokenCookie(globalToken: string) {
  if (!globalToken) {
    logger.warn('Access token is empty')
    return
  }

  const cookieStore = await cookies()
  cookieStore.set(CookieKeys.GlobalToken, globalToken, {
    secure: true,
    path: '/',
    httpOnly: true,
    maxAge: GLOBAL_TOKEN_MAX_AGE,
  })
}

const getCookieDomain = (url: URL): string => {
  const { hostname } = url
  // this is to ensure that when user is logged from wizard that they stay logged in dev portal
  const domain = hostname.substring(hostname.indexOf('.') + 1)
  return domain
}

async function upgradeUnsecureGlobalTokenCookie(url: URL) {
  const cookieStore = await cookies()
  const tokenFromUnsecureCookie = cookieStore.get(
    CookieKeys.UnsecureGlobalToken,
  )?.value

  if (!tokenFromUnsecureCookie) {
    return undefined
  }

  setGlobalTokenCookie(tokenFromUnsecureCookie)

  /**
   * IMPORTANT! When deleting a cookie, and you're not relying on the default attributes,
   * you must pass the exact same path and domain attributes used to set the cookie
   */
  cookieStore.delete({
    name: CookieKeys.UnsecureGlobalToken,
    domain: getCookieDomain(url),
    path: '/',
  })

  return tokenFromUnsecureCookie
}

export async function getGlobalTokenCookie({ url }: { url?: URL } = {}) {
  const globalToken = (await cookies()).get(CookieKeys.GlobalToken)?.value as
    | string
    | null

  if (globalToken) {
    return globalToken
  }

  // TODO: Remove this once we have a proper way to get the global token
  if (!url) return undefined
  return await upgradeUnsecureGlobalTokenCookie(url)
}

export const deleteGlobalTokenCookie = async () => {
  const cookieStore = await cookies()
  /**
   * `cookies.delete` does not support prefixed cookies yet.
   * See: https://github.com/withastro/astro/issues/10480
   */
  cookieStore.set(CookieKeys.GlobalToken, 'deleted', {
    secure: true,
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  })
}

interface OnboardingStatus {
  email: string
  status: 'pending' | 'completed'
}

export const setOnboardingStatusCookie = async (
  onboardingStatus: OnboardingStatus,
) => {
  const cookieStore = await cookies()
  cookieStore.set({
    name: CookieKeys.OnboardingStatus,
    value: JSON.stringify(onboardingStatus),
    secure: true,
    path: '/',
    httpOnly: true,
    maxAge: ONBOARDING_COOKIE_MAX_AGE,
  })
}

export const getOnboardingStatusCookie = async () => {
  const cookieStore = await cookies()
  const value = cookieStore.get(CookieKeys.OnboardingStatus)?.value
  return value ? (JSON.parse(value) as OnboardingStatus) : undefined
}

export const getEmailFromGlobalTokenCookie = async () => {
  const globalToken = await getGlobalTokenCookie()
  return globalToken ? decodeJwt<{ email: string }>(globalToken).email : null
}
