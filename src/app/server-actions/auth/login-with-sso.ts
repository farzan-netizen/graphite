'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import { AuthFormSsoUrlQueryDocument } from '@/generated/graphql'
import { validateGlobalTokenCode } from './validate-global-token-code'
import { logger } from '@/utils/server/logger'
import { EnvVariables } from '@/constants/env-variables'
import { encodeSsoState, type AuthOperationType } from '@/utils/server/sso'
import { getApiErrorMessage } from '@/utils/api-error'
import { redirect } from 'next/navigation'
import { err, type ServerActionResult } from '@/utils/server-action-result'

const AuthFormSsoUrlQueryQql = gql`
  query AuthFormSsoUrlQuery($input: SsoUrlInput!) {
    ssoUrl(input: $input) {
      url
    }
  }
`

export async function loginWithSso({
  provider,
  redirectUri,
  referrer,
  referrerUri,
  email,
  verificationCode,
  opType,
}: {
  provider: string
  redirectUri?: string
  referrer?: string
  referrerUri?: string
  email?: string
  verificationCode?: string
  opType?: AuthOperationType
}): Promise<ServerActionResult<{ success: boolean }> | void> {
  if (provider) {
    const state = {
      opType: opType ?? 'signin',
      callbackUrl: EnvVariables.SSOS_CALLBACK_URL,
      redirectUri: redirectUri ?? EnvVariables.SSOS_CALLBACK_URL,
      referrer: referrer ?? '',
      referrerUri: referrerUri ?? '',
    }

    let redirectUrl = ''
    try {
      const client = await getClient()
      const { data } = await client.query({
        query: AuthFormSsoUrlQueryDocument,
        variables: {
          input: {
            callbackUrl: EnvVariables.SSOS_CALLBACK_URL,
          },
        },
      })
      redirectUrl = `${data?.ssoUrl?.url}&state=${encodeSsoState(state)}`
    } catch (error) {
      return err(getApiErrorMessage(error))
    }

    if (!redirectUrl) {
      logger.error('Failed to get SSO url')
    }
    redirect(redirectUrl ?? '/')
  }

  if (!verificationCode) {
    return err('Verification code is required')
  }

  if (!email) {
    return err('Email is required')
  }

  return validateGlobalTokenCode({
    email,
    verificationCode,
  })
}
