import type { InterpolationColorspace } from '@adobe/leonardo-contrast-colors'

// Contrast ratios taken from Leonardo color tool
// https://leonardocolor.io/theme.html

export const CONTRAST_RATIOS = {
  50: 1.06,
  100: 1.11,
  200: 1.24,
  300: 1.48,
  400: 2.56,
  500: 4.8,
  600: 7.58,
  700: 10.35,
  800: 14.7,
  900: 17.9,
  950: 20.2,
}

export const COLOR_CONFIG = {
  ratios: CONTRAST_RATIOS,
  colorspace: 'OKLCH' as InterpolationColorspace,
  smooth: true,
}

export const THEME_CONFIG_LIGHT = {
  lightness: 100,
  contrast: 1,
  saturation: 100,
  output: 'HEX' as const,
  formula: 'wcag2' as const,
}

export const THEME_CONFIG_DARK = {
  lightness: 100,
  contrast: 1,
  saturation: 70,
  output: 'HEX' as const,
  formula: 'wcag2' as const,
}
