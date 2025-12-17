'use server'

import { gql } from '@apollo/client'
import { authGuard } from '../utils/auth-guard'
import { getClient } from '@/utils/server/apollo-client'
import { ProfileFormAuthMemberQueryDocument } from '@/generated/graphql'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

const _ProfileFormAuthMemberQueryQql = gql`
  query ProfileFormAuthMemberQuery {
    authMember {
      id
      name
      email
      profilePictureId
    }
  }
`

export const getAuthMember = authGuard(
  async (): Promise<ServerActionResult<{ fullName?: string | null }>> => {
    try {
      const client = await getClient()
      const { data } = await client.query({
        query: ProfileFormAuthMemberQueryDocument,
      })
      return ok({
        fullName: data?.authMember?.name,
      })
    } catch (error) {
      return err(getApiErrorMessage(error))
    }
  },
)
