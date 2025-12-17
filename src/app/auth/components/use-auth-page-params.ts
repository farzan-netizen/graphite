import { SearchParams } from '@/constants/search-params'
import { useSearchParams } from '@/hooks/use-search-params'
import { useMemo } from 'react'

export const useAuthPageParams = () => {
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get(SearchParams.Redirect)
  const redirectUriParam = searchParams.get(SearchParams.RedirectUri)
  const redirectUri = redirectParam ?? redirectUriParam
  const referrer = searchParams.get(SearchParams.Referrer)
  const referrerUri = searchParams.get(SearchParams.ReferrerUri)

  const redirectParams = useMemo(
    () => ({
      ...(redirectUri ? { redirect_uri: redirectUri } : {}),
      ...(referrer ? { referrer } : {}),
      ...(referrerUri ? { referrer_uri: referrerUri } : {}),
    }),
    [redirectUri, referrer, referrerUri],
  )

  const googleSsoParams = useMemo(
    () => ({
      ...redirectParams,
      provider: 'google',
    }),
    [redirectParams],
  )

  const messageParam = searchParams.get(SearchParams.Message)

  return {
    redirectParams,
    googleSsoParams,
    messageParam,
  }
}
