import 'server-only'

import { decode, encode } from './base64'
import { logger } from './logger'
import { SearchParams } from '@/constants/search-params'

export type AuthOperationType = 'signin' | 'signup'

export interface SsoState {
  opType: AuthOperationType

  /**
   * This value is fixed and should be provided based
   * on the deployment configurations. If you want to customize
   * the post-authentication landing page, use `redirectUri` parameter.
   */
  callbackUrl?: string

  /**
   * The optional redirect URI to send the user to after the authentication
   * is complete.
   */
  redirectUri?: string
  referrer?: string
  referrerUri?: string
}

export const encodeSsoState = (state: SsoState) => encode(JSON.stringify(state))

export const decodeSsoState = (state: string): SsoState => {
  const defaultState: SsoState = { opType: 'signin' }
  if (!state) {
    return defaultState
  }

  try {
    return JSON.parse(decode(state))
  } catch (error) {
    logger.error(`Error parsing ssos state ${state}, ${error}`)
    return defaultState
  }
}

export const generateSearchParamsFromSsoState = (state: SsoState) => {
  const params = new URLSearchParams()
  params.set(SearchParams.OpType, state.opType)
  if (state.redirectUri) {
    params.set(SearchParams.RedirectUri, state.redirectUri)
  }
  if (state.referrer) {
    params.set(SearchParams.Referrer, state.referrer)
  }
  if (state.referrerUri) {
    params.set(SearchParams.ReferrerUri, state.referrerUri)
  }
  return params
}
