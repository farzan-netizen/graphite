'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import {
  AuthFormRequestGlobalTokenCodeMutationDocument,
  type RequestGlobalTokenInput,
} from '@/generated/graphql'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const AuthFormRequestGlobalTokenCodeMutationQql = gql`
  mutation AuthFormRequestGlobalTokenCodeMutation(
    $input: RequestGlobalTokenInput!
  ) {
    requestGlobalTokenCode(input: $input) {
      status
    }
  }
`

export async function requestGlobalTokenCode(
  input: RequestGlobalTokenInput,
): Promise<ServerActionResult<{ status: string }>> {
  try {
    const client = await getClient()
    const { data } = await client.mutate({
      mutation: AuthFormRequestGlobalTokenCodeMutationDocument,
      variables: { input },
    })
    return ok({
      status: data?.requestGlobalTokenCode?.status ?? '',
    })
  } catch (error) {
    return err(getApiErrorMessage(error))
  }
}
