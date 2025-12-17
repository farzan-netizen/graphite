import 'server-only'

import { EnvVariables } from '@/constants/env-variables'
import { HttpLink } from '@apollo/client'
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'
import { getGlobalTokenCookie } from '@/app/server-actions/utils/cookie'

export const { getClient } = registerApolloClient(async () => {
  const token = await getGlobalTokenCookie()
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      headers: {
        Accept:
          'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      uri: EnvVariables.GQL_GLOBAL_ENDPOINT,
    }),
  })
})
