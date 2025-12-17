import 'server-only'
import { type NextRequest } from 'next/server'
import { logger } from '@/utils/server/logger'
import { redirect } from 'next/navigation'
import { SearchParams } from '@/constants/search-params'
import {
  decodeSsoState,
  generateSearchParamsFromSsoState,
  type SsoState,
} from '@/utils/server/sso'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import { AuthFormLoginWithSsoCodeQueryDocument } from '@/generated/graphql'
import { getReferrerCode } from '@/utils/server/cello/cookie'
import { setGlobalTokenCookie } from '@/app/server-actions/utils/cookie'
import { sanitizeAuthRedirectUrl } from '@/utils/server/redirect'
import { getRedirectUrl } from '@/utils/url'
import { getApiErrorMessage } from '@/utils/api-error'
import {
  serverTrackEvent,
  serverIdentify,
} from '@/utils/segment/analytics-server'
import { getEmailDomain, isWorkEmail } from '@/utils/email'

const AuthFormLoginWithSsoCodeQueryQql = gql`
  query AuthFormLoginWithSsoCodeQuery($input: LoginWithSsoCodeInput!) {
    loginWithSsoCode(input: $input) {
      accessToken
      email
    }
  }
`

export async function GET(req: NextRequest) {
  const url = req.nextUrl

  const code = url.searchParams.get(SearchParams.Code)
  const hd = url.searchParams.get(SearchParams.Hd) ?? ''
  const prompt = url.searchParams.get(SearchParams.Prompt) ?? ''
  const scope = url.searchParams.get(SearchParams.Scope) ?? ''
  const state = url.searchParams.get(SearchParams.State) ?? ''
  const oauthToken = url.searchParams.get(SearchParams.OauthToken) ?? ''
  const oauthVerifier = url.searchParams.get(SearchParams.OauthVerifier) ?? ''

  const parsedState = decodeSsoState(state)

  if (!code && !hd && !prompt && !scope && !state && !oauthToken) {
    logger.info('Redirecting: No query params was provided')
    redirect(
      getFailureRedirect({
        state: parsedState,
        message: 'Something went wrong while logging you in.',
      }),
    )
  }

  let accessToken = ''
  let userEmail = ''
  try {
    const referrerCode = await getReferrerCode()
    const client = await getClient()
    const { data } = await client.query({
      query: AuthFormLoginWithSsoCodeQueryDocument,
      variables: {
        input: {
          code,
          hd,
          prompt,
          scope,
          state,
          oauth_token: oauthToken,
          oauth_verifier: oauthVerifier,
          referrer_code: referrerCode,
        },
      },
    })
    accessToken = data?.loginWithSsoCode?.accessToken ?? ''
    userEmail = data?.loginWithSsoCode?.email ?? ''

    if (accessToken && userEmail) {
      await serverTrackEvent({
        event: 'signup_google_auth_completed',
        userId: userEmail,
        properties: {
          auth_method: 'google',
          email_domain: getEmailDomain(userEmail),
          is_work_email: isWorkEmail(userEmail),
        },
      })

      // Identify user for Salesforce contact creation
      await serverIdentify({
        userId: userEmail,
        traits: {
          email: userEmail,
          emailDomain: getEmailDomain(userEmail),
          authMethod: 'google',
        },
      })
    }
  } catch (errors) {
    const message = getApiErrorMessage(errors)
    logger.error(`Error redirecting sso: ${errors}`)
    redirect(getFailureRedirect({ state: parsedState, message }))
  }

  if (!accessToken) {
    logger.error(`No access token was returned`)
    redirect(
      getFailureRedirect({
        state: parsedState,
        message: 'Something went wrong while logging you in.',
      }),
    )
  }

  setGlobalTokenCookie(accessToken)

  const sanitizedRedirectUrl = sanitizeAuthRedirectUrl(
    getRedirectUrl(parsedState),
  )

  redirect(sanitizedRedirectUrl)
}

function getFailureRedirect({
  state,
  message,
}: {
  state: SsoState
  message?: string
}) {
  const params = generateSearchParamsFromSsoState(state)
  params.set('message', message ?? '')
  return `/auth/${state.opType}?${params.toString()}`
}
