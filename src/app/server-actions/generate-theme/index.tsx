'use server'

import { cache } from 'react'

import { ok, type ServerActionResult } from '@/utils/server-action-result'

import { generateTheme as generateThemeLib } from './generate-theme'
import { GenerateThemeInput, Theme } from './types'

export type { GenerateThemeInput, Theme }

/**
 * Server action to generate a theme based on a single brand color.
 * Takes a primary color and generates a complete theme with light and dark color schemes.
 *
 * @example
 * ```ts
 * const result = await generateTheme({ color: '#4F46E5' })
 * if (result.ok) {
 *   const theme = result.data
 *   // theme.light1, theme.dark1, etc.
 * }
 * ```
 */
export const generateTheme = cache(
  async (input: GenerateThemeInput): Promise<ServerActionResult<Theme>> => {
    const theme = generateThemeLib(input)
    return ok(theme)
  },
)
