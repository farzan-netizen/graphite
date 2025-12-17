'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/utils/server/apollo-client'
import {
  VerifyFormResendGlobalTokenCodeMutationDocument,
  type RequestGlobalTokenInput,
  ActionStatus,
} from '@/generated/graphql'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const VerifyFormResendGlobalTokenCodeMutationQql = gql`
  mutation VerifyFormResendGlobalTokenCodeMutation(
    $input: RequestGlobalTokenInput!
  ) {
    resendGlobalTokenCode(input: $input) {
      status
    }
  }
`

export async function resendGlobalTokenCode(
  input: RequestGlobalTokenInput,
): Promise<ServerActionResult<{ success: boolean }>> {
  try {
    const client = await getClient()
    const { data } = await client.mutate({
      mutation: VerifyFormResendGlobalTokenCodeMutationDocument,
      variables: { input },
    })
    return ok({
      success: data?.resendGlobalTokenCode?.status === ActionStatus.Succeeded,
    })
  } catch (error) {
    return err(getApiErrorMessage(error))
  }
}
