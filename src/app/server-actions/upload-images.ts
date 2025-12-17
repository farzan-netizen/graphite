'use server'

import { gql } from '@apollo/client'
import { authGuard } from './utils/auth-guard'
import { getClient } from '@/utils/server/apollo-client'
import {
  CreateImagesMutationDocument,
  type SignedUrl,
} from '@/generated/graphql'
import { getApiErrorMessage } from '@/utils/api-error'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

interface UploadImagesArgs {
  name?: string
  contentType?: string
  file: File
}

interface Image {
  id: string
  url: string
  name?: string
  downloadUrl: string
  urls: SignedUrl['urls']
}

const _CreateImagesMutationGql = gql`
  mutation CreateImagesMutation($input: [CreateImageInput!]!) {
    createImages(input: $input) {
      fields
      mediaId
      mediaUrl
      mediaDownloadUrl
      signedUrl
      urls {
        full
        large
        medium
        small
        thumb
      }
    }
  }
`

export const uploadImages = authGuard(async function (
  input: UploadImagesArgs[],
): Promise<ServerActionResult<Image[]>> {
  try {
    const output: Image[] = []

    const client = await getClient()
    const { data } = await client.mutate({
      mutation: CreateImagesMutationDocument,
      variables: {
        input: input.map(({ file, ...rest }) => ({
          contentType: file.type,
          size: file.size,
          ...rest,
        })),
      },
    })

    const signedUrls: SignedUrl[] = data?.createImages ?? []

    const promises = signedUrls.map((signedUrl, index: number) => {
      const { file } = input[index]
      const formData = new FormData()
      const parsedFields = JSON.parse(signedUrl.fields)
      // The order of appended key-value into the formData matters.
      Object.entries(parsedFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return fetch(signedUrl.signedUrl, {
        method: 'POST',
        body: formData,
      })
        .then(r => r.text())
        .then(() => {
          output.push({
            id: signedUrl.mediaId,
            url: signedUrl.mediaUrl,
            urls: signedUrl.urls,
            name: input[index].name,
            downloadUrl: signedUrl.mediaDownloadUrl,
          })
        })
        .catch(e => {
          console.debug({ e })
        })
    })

    await Promise.all(promises.filter(Boolean))

    return ok(output)
  } catch (error) {
    return err(getApiErrorMessage(error))
  }
})
