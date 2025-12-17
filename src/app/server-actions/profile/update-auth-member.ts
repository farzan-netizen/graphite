'use server'

import { gql } from '@apollo/client'
import { authGuard } from '../utils/auth-guard'
import {
  ProfileFormUpdateAuthMemberMutationDocument,
  type UpdateGlobalMemberInput,
} from '@/generated/graphql'
import { getClient } from '@/utils/server/apollo-client'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const ProfileFormUpdateAuthMemberMutationQql = gql`
  mutation ProfileFormUpdateAuthMemberMutation(
    $input: UpdateGlobalMemberInput!
  ) {
    updateAuthMember(input: $input) {
      id
      name
    }
  }
`

export const updateAuthMember = authGuard(
  async (
    input: UpdateGlobalMemberInput,
  ): Promise<ServerActionResult<{ fullName?: string | null }>> => {
    try {
      const client = await getClient()
      const { data } = await client.mutate({
        mutation: ProfileFormUpdateAuthMemberMutationDocument,
        variables: {
          input,
        },
      })
      return ok({
        fullName: data?.updateAuthMember?.name,
      })
    } catch (error) {
      return err(getApiErrorMessage(error))
    }
  },
)
