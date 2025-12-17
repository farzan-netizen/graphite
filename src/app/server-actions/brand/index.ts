'use server'
import { z } from 'zod'
import { EnvVariables } from '@/constants/env-variables'
import { logger } from '@/utils/server/logger'
import { authGuard } from '../utils/auth-guard'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'
import { cache } from 'react'
import { CACHE_TAGS } from '../constants'
interface BrandResponse {
  id?: string
  name?: string
  domain?: string
  description?: string
  longDescription?: string
  logos?: {
    theme?: string
    formats?: {
      src: string
      format?: string
      width?: number
      height?: number
    }[]
    type?: string
  }[]
  colors?: {
    hex: string
    type?: string
    brightness?: number
  }[]
  fonts?: {
    name: string
    type: string
    origin?: string
  }[]
  images?: {
    formats?: {
      src: string
      format: string
      width: number
      height: number
    }[]
    type: string
  }[]
  links?: {
    name: string
    url: string
  }[]
  company?: {
    employees?: number
    foundedYear?: number
    location?: {
      city?: string
      country?: string
      state?: string
    }
    industries?: {
      id: string
      name: string
      emoji?: string
      score?: number
      slug?: string
    }[]
  }
}

export const getBrand = authGuard(
  cache(
    async ({
      identifier: identifierParam,
    }: {
      identifier: string
    }): Promise<ServerActionResult<BrandResponse>> => {
      // TODO: add rate limiting and caching
      const schema = z.object({
        identifierParam: z.string().min(1).max(500),
      })
      const { success, data: parsedData } = schema.safeParse({
        identifierParam,
      })
      if (!success) {
        return err('Invalid identifier')
      }

      const identifier = parsedData?.identifierParam
      try {
        const url = `${EnvVariables.BRAND_FETCH_BASE_URL}/${identifier}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${EnvVariables.BRAND_FETCH_API_KEY}`,
            'Content-Type': 'application/json',
          },
          next: {
            tags: [CACHE_TAGS.BRAND, `brand-${identifier}`],
            revalidate: 3600,
          },
        })

        if (!response.ok) {
          logger.error(`Error fetching brand data`, {
            response,
          })
          return err('Failed to fetch brand data')
        }

        const data = (await response.json()) as BrandResponse

        return ok({
          name: data?.name,
          domain: data?.domain,
          logos: data?.logos,
          colors: data?.colors,
          company: data?.company,
        })
      } catch (error) {
        logger.error('Error fetching brand data:', {
          error,
        })
        return err('Failed to fetch brand data')
      }
    },
  ),
)
