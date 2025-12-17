import { NextRequest, NextResponse } from 'next/server'
import { RoutePaths } from './constants/routes'
import {
  getEmailFromGlobalTokenCookie,
  getOnboardingStatusCookie,
  setOnboardingStatusCookie,
} from './app/server-actions/utils/cookie'
import { SearchParams } from './constants/search-params'
import { getRedirectUrl } from './utils/url'
import { sanitizeAuthRedirectUrl } from './utils/server/redirect'
import { HeaderKeys } from './constants/headers'
import { gql } from '@apollo/client'
import { getClient } from './utils/server/apollo-client'
import {
  OnboardingTriggerNetworkListQueryDocument,
  ProfileMenuAvatarAuthMemberQueryDocument,
} from './generated/graphql'
import { signout } from './app/server-actions/auth/signout'

const PUBLIC_ROUTES = [RoutePaths.SIGNIN, RoutePaths.SIGNUP, RoutePaths.VERIFY]

const _ProfileMenuAvatarAuthMemberQueryQql = gql`
  query ProfileMenuAvatarAuthMemberQuery {
    authMember {
      id
      name
      email
      profilePicture {
        ... on Image {
          id
          url
        }
      }
    }
  }
`

const _OnboardingTriggerNetworkListQueryQql = gql`
  query OnboardingTriggerNetworkListQuery {
    networks {
      id
    }
  }
`

export default async function proxy(req: NextRequest) {
  // TODO: add global error handling
  const path = req.nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTES.includes(
    path as (typeof PUBLIC_ROUTES)[number],
  )

  const email = await getEmailFromGlobalTokenCookie()

  const hasValidGlobalToken = !!email

  const requestHeaders = new Headers(req.headers)

  if (email) {
    requestHeaders.set(HeaderKeys.Email, email)
  }
  // Redirect to signup page if the user is not authenticated
  if (!isPublicRoute && !hasValidGlobalToken) {
    const redirectUrl = new URL(RoutePaths.SIGNUP, req.nextUrl)
    redirectUrl.searchParams.set(
      SearchParams.RedirectUri,
      req.nextUrl.pathname + req.nextUrl.search,
    )
    return NextResponse.redirect(redirectUrl, {
      headers: requestHeaders,
    })
  }

  // Redirect to onboarding page if the user is authenticated and needs onboarding
  if (hasValidGlobalToken) {
    const [{ data: authMember }, { data: _networksData }] = await Promise.all([
      (await getClient()).query({
        query: ProfileMenuAvatarAuthMemberQueryDocument,
        variables: {},
      }),
      (await getClient()).query({
        query: OnboardingTriggerNetworkListQueryDocument,
        variables: {},
      }),
    ])

    if (!authMember?.authMember) {
      // If there’s a token but no authMember, something has gone wrong the clients needs to re-authenticate.
      await signout()
      return NextResponse.redirect(new URL(RoutePaths.SIGNIN, req.nextUrl))
    }

    // TODO: Add username missing check
    // const usernameMissing = !authMember?.authMember?.name

    // TODO decide when we want to show the onboarding from backend data
    const onboardingCookie = await getOnboardingStatusCookie()

    // TODO: add correct logic when flow is ready
    const noNetworks = true //networksData?.networks?.length === 0
    const pendingOnboarding = onboardingCookie?.status === 'pending'
    const needOnboarding =
      noNetworks &&
      (!onboardingCookie ||
        onboardingCookie.email !== email ||
        pendingOnboarding)

    if (needOnboarding) {
      await setOnboardingStatusCookie({
        email: email ?? '',
        status: 'pending',
      })
    } else {
      await setOnboardingStatusCookie({
        email: email ?? '',
        status: 'completed',
      })
    }
    const isOnboardingPage = path.startsWith(RoutePaths.ONBOARDING)

    if (isOnboardingPage && !needOnboarding) {
      return NextResponse.redirect(new URL(RoutePaths.HOME, req.nextUrl), {
        headers: requestHeaders,
      })
    }

    if (!isOnboardingPage && needOnboarding) {
      const onboardingUrl = new URL(RoutePaths.ONBOARDING, req.nextUrl)
      onboardingUrl.searchParams.set(
        SearchParams.RedirectUri,
        `${req.nextUrl.pathname}${req.nextUrl.search}`,
      )
      return NextResponse.redirect(onboardingUrl, {
        headers: requestHeaders,
      })
    }
  }

  // Redirect to home page if the user is authenticated
  if (isPublicRoute && hasValidGlobalToken) {
    const redirectUri = getRedirectUrl({
      referrer: req.nextUrl.searchParams.get(SearchParams.Referrer),
      referrerUri: req.nextUrl.searchParams.get(SearchParams.ReferrerUri),
      redirectUri:
        req.nextUrl.searchParams.get(SearchParams.Redirect) ||
        req.nextUrl.searchParams.get(SearchParams.RedirectUri),
    })
    const sanitizedUrl = sanitizeAuthRedirectUrl(redirectUri)
    return NextResponse.redirect(new URL(sanitizedUrl, req.nextUrl), {
      headers: requestHeaders,
    })
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)'],
}
