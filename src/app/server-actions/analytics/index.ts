'use server'
import { gql } from '@apollo/client'
import { authGuard } from '../utils/auth-guard'
import { getClient } from '@/utils/server/apollo-client'
import { HooksSegmentIdentifyAuthMemberQueryDocument } from '@/generated/graphql'
import { err, ok, type ServerActionResult } from '@/utils/server-action-result'
import { getApiErrorMessage } from '@/utils/api-error'

const _HooksSegmentIdentifyAuthMemberQueryGql = gql`
  query hooksSegmentIdentifyAuthMemberQuery {
    authMember {
      id
      name
      email
      createdAt
    }
  }
`

export const getSegmentIdentifyAuthMember = authGuard(
  async (): Promise<
    ServerActionResult<{
      id: string | undefined
      name: string | null | undefined
      email: string | undefined
      createdAt: unknown
    }>
  > => {
    try {
      const client = await getClient()
      const { data } = await client.query({
        query: HooksSegmentIdentifyAuthMemberQueryDocument,
      })
      return ok({
        id: data?.authMember?.id,
        name: data?.authMember?.name,
        email: data?.authMember?.email,
        createdAt: data?.authMember?.createdAt,
      })
    } catch (error) {
      return err(getApiErrorMessage(error))
    }
  },
)
