import { getRedirectUrl } from '@/utils/url'
import { useSearchParams } from './use-search-params'
import { SearchParams } from '@/constants/search-params'

/**
 * Context: https://www.notion.so/bettermode/XSS-attack-on-astro-wizard-13b4dc460e6d809f8584ceb94faf28e3
 *
 * Enforcing CSP policies for scripts breaks Astro components. Therefore, URL is sanitized manually.
 * See: https://github.com/withastro/roadmap/discussions/377
 */
const isValidRedirectUri = (param: string | null) => {
  if (!param) {
    return false
  }
  return (
    param.startsWith('/') ||
    param.startsWith('http://') ||
    param.startsWith('https://')
  )
}

export function useRedirect() {
  const searchParams = useSearchParams()

  const redirectParam = searchParams.get(SearchParams.Redirect)
  const redirectUriParam = searchParams.get(SearchParams.RedirectUri)
  const redirectUriCandidate = redirectParam ?? redirectUriParam
  const redirectUri = isValidRedirectUri(redirectUriCandidate)
    ? redirectUriCandidate
    : null

  const referrer = searchParams.get(SearchParams.Referrer)
  const referrerUri = searchParams.get(SearchParams.ReferrerUri)

  return getRedirectUrl({ referrer, referrerUri, redirectUri })
}
