import Color from 'colorjs.io'

interface TokenModifier {
  type: 'alpha' | 'desaturate'
  amount?: string | number
}

interface Token {
  value: string
  modify?: TokenModifier[]
}

/** Apply alpha and other modifications to colors */
export const colorTransform = (token: Token): string => {
  const { value, modify = [] } = token

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const color = new (Color as any)(value)

  const modifyAlpha = modify.find(it => it.type === 'alpha')
  const modifyDesaturate = modify.find(it => it.type === 'desaturate')

  if (modifyAlpha?.amount) {
    color.alpha =
      typeof modifyAlpha.amount === 'string'
        ? parseFloat(modifyAlpha.amount)
        : modifyAlpha.amount
  }

  if (modifyDesaturate) {
    const amount =
      typeof modifyDesaturate.amount === 'string'
        ? parseFloat(modifyDesaturate.amount)
        : (modifyDesaturate.amount ?? 0.75)
    color.oklch.l *= amount
  }

  return color.toString({ format: 'hex' })
}

// Returns a new object with the values at each key mapped using mapFn(value)
export const objectMap = <T, R>(
  object: Record<string, T>,
  mapFn: (value: T) => R,
): Record<string, R> =>
  Object.keys(object).reduce(
    (result, key) => {
      result[key] = mapFn(object[key])
      return result
    },
    {} as Record<string, R>,
  )

// Deep merge utility
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target

  const source = sources.shift()
  if (!source) return target

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        target[key] = deepMerge(
          { ...targetValue } as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        ) as T[Extract<keyof T, string>]
      } else {
        target[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * Converts a colorjs.io Color instance to a hex string.
 * Handles gamut mapping to ensure the color is within sRGB.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHex = (color: any): string => {
  // Convert to sRGB and fit to gamut if needed
  const srgb = color.to('srgb')
  // Clamp values to 0-1 range for valid sRGB
  srgb.coords = srgb.coords.map((c: number) => Math.max(0, Math.min(1, c)))
  return srgb.toString({ format: 'hex' })
}

/**
 * Derives accent and neutral colors from a primary color.
 * - Accent: Shifts the hue slightly for a complementary feel
 * - Neutral: Desaturated version of the primary
 */
export const deriveColorsFromPrimary = (
  primaryHex: string,
): { primary: string; accent: string; neutral: string } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primary = new (Color as any)(primaryHex)

  // Get OKLCH values for manipulation
  const oklch = primary.oklch

  // Accent: Shift hue by ~30 degrees for a harmonious accent
  const accentHue = ((oklch.h || 0) + 30) % 360
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accent = new (Color as any)('oklch', [
    oklch.l,
    oklch.c * 0.9,
    accentHue,
  ])

  // Neutral: Heavily desaturate the primary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const neutral = new (Color as any)('oklch', [
    oklch.l,
    oklch.c * 0.05,
    oklch.h || 0,
  ])

  return {
    primary: toHex(primary),
    accent: toHex(accent),
    neutral: toHex(neutral),
  }
}
