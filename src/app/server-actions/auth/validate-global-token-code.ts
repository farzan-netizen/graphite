'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import {
  VerifyFormGlobalTokenQueryDocument,
  type GlobalTokenInput,
} from '@/generated/graphql'
import { setGlobalTokenCookie } from '../utils/cookie'
import { getApiErrorMessage } from '@/utils/api-error'
import { Errors } from '@/constants/errors'
import { getReferrerCode } from '@/utils/server/cello/cookie'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const VerifyFormGlobalTokenQueryQql = gql`
  query VerifyFormGlobalTokenQuery($input: GlobalTokenInput!) {
    globalToken(input: $input) {
      accessToken
      email
    }
  }
`

export async function validateGlobalTokenCode({
  email,
  verificationCode,
}: Pick<GlobalTokenInput, 'email' | 'verificationCode'>): Promise<
  ServerActionResult<{ success: boolean }>
> {
  if (!email || !verificationCode) {
    return err('Email and verificationCode are required')
  }

  try {
    const referrerCode = await getReferrerCode()
    const client = await getClient()
    const { data } = await client.query({
      query: VerifyFormGlobalTokenQueryDocument,
      variables: {
        input: {
          email,
          verificationCode,
          referrerCode,
        },
      },
    })

    const accessToken = data?.globalToken?.accessToken
    if (accessToken) {
      setGlobalTokenCookie(accessToken)
      return ok({ success: true })
    }

    return err(Errors.SOMETHING_WENT_WRONG)
  } catch (error) {
    return err(getApiErrorMessage(error))
  }
}
