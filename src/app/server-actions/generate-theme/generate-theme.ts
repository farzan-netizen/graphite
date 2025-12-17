import Color from 'colorjs.io'
import type { CssColor } from '@adobe/leonardo-contrast-colors'

import { deepMerge, deriveColorsFromPrimary } from './color-utils'
import { generatePalette, PaletteResult } from './palette-generator'
import { getColorTokens, getSemanticPalette } from './tokens'
import { ColorScheme, GenerateThemeInput, Theme, ThemeColors } from './types'

interface TokenModifier {
  type: 'alpha' | 'desaturate'
  amount?: string | number
}

interface TokenValue {
  value: string
  modify?: TokenModifier[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TokenRecord = Record<string, any>

interface PaletteToken {
  value: string
}

interface ColorToneTokens {
  [key: string]: PaletteToken
}

const getTokens = (palettes: PaletteResult) => {
  return {
    ref: {
      ...(palettes as unknown as Record<string, ColorToneTokens>),
      white: { value: '#FFFFFF' },
      black: { value: '#000000' },
    },
  }
}

/**
 * Resolves a token reference like {ref.primary.500} or {color.surface}
 * to its actual hex color value.
 */
const resolveTokenReference = (
  reference: string,
  allTokens: TokenRecord,
  resolvedCache: Map<string, string>,
  visitedStack: Set<string> = new Set(),
): string => {
  // Check cache first
  if (resolvedCache.has(reference)) {
    return resolvedCache.get(reference)!
  }

  // Detect circular references
  if (visitedStack.has(reference)) {
    console.warn(`Circular reference detected: ${reference}`)
    return '#FF00FF' // Return magenta for debugging
  }

  visitedStack.add(reference)

  // Parse the reference path: {ref.primary.500} -> ['ref', 'primary', '500']
  const path = reference.replace(/[{}]/g, '').split('.')

  // Navigate to the token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = allTokens
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment]
    } else {
      console.warn(`Token path not found: ${reference}`)
      return '#FF00FF' // Return magenta for debugging
    }
  }

  // Get the value
  const tokenValue = current as TokenValue
  if (!tokenValue || typeof tokenValue.value !== 'string') {
    console.warn(`Invalid token value: ${reference}`)
    return '#FF00FF'
  }

  let resolvedValue = tokenValue.value

  // If the value is another reference, resolve it recursively
  if (resolvedValue.startsWith('{') && resolvedValue.endsWith('}')) {
    resolvedValue = resolveTokenReference(
      resolvedValue,
      allTokens,
      resolvedCache,
      visitedStack,
    )
  }

  // Apply modifications if present
  if (tokenValue.modify && tokenValue.modify.length > 0) {
    resolvedValue = applyModifications(resolvedValue, tokenValue.modify)
  }

  // Cache the result
  resolvedCache.set(reference, resolvedValue)
  visitedStack.delete(reference)

  return resolvedValue
}

/**
 * Apply color modifications (alpha, desaturate) to a hex color.
 */
const applyModifications = (
  hexColor: string,
  modifiers: TokenModifier[],
): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const color = new (Color as any)(hexColor)

    for (const modifier of modifiers) {
      if (modifier.type === 'alpha' && modifier.amount !== undefined) {
        const amount =
          typeof modifier.amount === 'string'
            ? parseFloat(modifier.amount)
            : modifier.amount
        color.alpha = amount
      } else if (modifier.type === 'desaturate') {
        const amount =
          typeof modifier.amount === 'string'
            ? parseFloat(modifier.amount)
            : (modifier.amount ?? 0.75)
        color.oklch.l *= amount
      }
    }

    return (color.toString as (options: { format: string }) => string)({
      format: 'hex',
    })
  } catch {
    return hexColor
  }
}

/**
 * Generates theme colors for a specific color scheme by resolving all token references.
 */
const generateThemeColors = (
  colorScheme: ColorScheme,
  paletteTokens: TokenRecord,
): ThemeColors => {
  // Get semantic palette and color tokens
  const semanticPalette = getSemanticPalette(colorScheme)
  const colorTokenSets = getColorTokens(colorScheme)

  // Merge all tokens together
  let allTokens: TokenRecord = deepMerge({}, paletteTokens, semanticPalette)
  for (const tokenSet of colorTokenSets) {
    allTokens = deepMerge(allTokens, tokenSet)
  }

  // Cache for resolved values
  const resolvedCache = new Map<string, string>()

  // Extract and resolve all color tokens
  const colorTokens = allTokens.color as Record<string, TokenValue>
  const result: Record<string, string> = {}

  for (const [tokenName, tokenValue] of Object.entries(colorTokens)) {
    let resolvedValue = tokenValue.value

    // Resolve reference if needed
    if (resolvedValue.startsWith('{') && resolvedValue.endsWith('}')) {
      resolvedValue = resolveTokenReference(
        resolvedValue,
        allTokens,
        resolvedCache,
      )
    }

    // Apply modifications if present
    if (tokenValue.modify && tokenValue.modify.length > 0) {
      resolvedValue = applyModifications(resolvedValue, tokenValue.modify)
    }

    result[tokenName] = resolvedValue
  }

  return result as unknown as ThemeColors
}

/**
 * Generates a complete theme from a single brand color.
 *
 * @param input - The input containing a single brand color
 * @returns A complete theme with light and dark color schemes
 */
export const generateTheme = (input: GenerateThemeInput): Theme => {
  // Derive primary, accent, and neutral colors from the single input color
  const derivedColors = deriveColorsFromPrimary(input.color)

  // Cast to CssColor for Leonardo compatibility
  const paletteInput = {
    primary: derivedColors.primary as CssColor,
    accent: derivedColors.accent as CssColor,
    neutral: derivedColors.neutral as CssColor,
  }

  const lightTokens = getTokens(generatePalette(paletteInput))
  const darkTokens = getTokens(
    generatePalette(paletteInput, { darkMode: true }),
  )

  const light1 = generateThemeColors('light1', lightTokens)
  const light2 = generateThemeColors('light2', lightTokens)
  const light3 = generateThemeColors('light3', lightTokens)
  const dark1 = generateThemeColors('dark1', darkTokens)
  const dark2 = generateThemeColors('dark2', darkTokens)

  return {
    id: 'generated',
    name: 'generated',
    palette: derivedColors,
    light1,
    light2,
    light3,
    dark1,
    dark2,
  }
}
