export const EnvVariables = {
  BRAND_FETCH_API_KEY: process.env.BRAND_FETCH_API_KEY as string,
  BRAND_FETCH_BASE_URL: process.env.BRAND_FETCH_BASE_URL as string,
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
  GQL_GLOBAL_ENDPOINT: process.env.GQL_GLOBAL_ENDPOINT as string,
  ENABLE_RECAPTCHA: process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL as string,
  REDIRECT_DOMAIN_ALLOWLIST: process.env.REDIRECT_DOMAIN_ALLOWLIST
    ? process.env.REDIRECT_DOMAIN_ALLOWLIST.split(',')
    : ([] as string[]),
  SSOS_CALLBACK_URL: process.env.SSOS_CALLBACK_URL as string,
  SEGMENT_WRITE_KEY: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY as string,
  SBJS_DOMAIN: process.env.NEXT_PUBLIC_SBJS_DOMAIN as string,
} as const
