'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import {
  AuthFormValidateEmailMutationDocument,
  type RequestGlobalTokenInput,
} from '@/generated/graphql'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const AuthFormValidateEmailMutationQql = gql`
  mutation AuthFormValidateEmailMutation($input: RequestGlobalTokenInput!) {
    validateEmail(input: $input) {
      valid
      suggestion
    }
  }
`

export async function validateEmail(
  input: RequestGlobalTokenInput,
): Promise<ServerActionResult<{ valid: boolean; suggestion?: string | null }>> {
  try {
    const client = await getClient()
    const { data } = await client.mutate({
      mutation: AuthFormValidateEmailMutationDocument,
      variables: { input },
    })
    return ok({
      valid: data?.validateEmail?.valid ?? false,
      suggestion: data?.validateEmail?.suggestion,
    })
  } catch (error) {
    return err(getApiErrorMessage(error))
  }
}
