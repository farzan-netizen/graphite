const HUB_REFERRER_NAME = 'hub'

const generateCustomHubRedirectUrl = (
  redirectUri: string | null | undefined,
) =>
  redirectUri ? `/hub-redirect?redirect_uri=${redirectUri}` : '/hub-redirect'

export const getRedirectUrl = ({
  referrer,
  referrerUri,
  redirectUri,
}: {
  referrer?: string | null
  referrerUri?: string | null
  redirectUri?: string | null
}): string => {
  if (referrer === HUB_REFERRER_NAME) {
    return generateCustomHubRedirectUrl(referrerUri)
  }

  return redirectUri || '/'
}
