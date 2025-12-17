import 'server-only'

import { URL } from 'node:url'
import { EnvVariables } from '@/constants/env-variables'
import { logger } from './logger'

/**
 * This method sanitizes redirect URL for authentication purposes.
 * This module can only be used in server actions. DO NOT USE IN CLIENT.
 */
export const sanitizeAuthRedirectUrl = (redirectUrl: string): string => {
  if (redirectUrl.startsWith('/')) {
    /**
     * It's a relative path and safe for redirect
     */
    return redirectUrl
  }

  try {
    const url = new URL(redirectUrl)
    const allowlist = EnvVariables.REDIRECT_DOMAIN_ALLOWLIST

    if (allowlist.includes(url.hostname)) {
      return redirectUrl
    }

    return '/'
  } catch (e) {
    logger.error('Invalid redirect URL', { error: e })
    // Invalid URL
    return '/'
  }
}
