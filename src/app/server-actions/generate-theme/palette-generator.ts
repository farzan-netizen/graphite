import {
  BackgroundColor as LeoBackgroundColor,
  Color as LeoColor,
  Theme as LeoTheme,
  type CssColor,
} from '@adobe/leonardo-contrast-colors'

import {
  COLOR_CONFIG,
  THEME_CONFIG_DARK,
  THEME_CONFIG_LIGHT,
} from './constants'
import { ColorTones } from './types'

interface PaletteInput {
  primary: CssColor
  accent: CssColor
  neutral: CssColor
}

interface GeneratePaletteConfig {
  darkMode: boolean
}

export interface PaletteResult {
  primary: ColorTones
  accent: ColorTones
  neutral: ColorTones
}

interface ColorValue {
  name: string
  value: string
}

interface ContrastColor {
  name: string
  values: ColorValue[]
}

export const generatePalette = (
  input: PaletteInput,
  config: GeneratePaletteConfig = { darkMode: false },
): PaletteResult => {
  const primary = new LeoColor({
    name: 'primary',
    colorKeys: [input.primary],
    ...COLOR_CONFIG,
  })

  const accent = new LeoColor({
    name: 'accent',
    colorKeys: [input.accent],
    ...COLOR_CONFIG,
  })

  const neutral = new LeoBackgroundColor({
    name: 'neutral',
    colorKeys: [input.neutral],
    ...COLOR_CONFIG,
  })

  const themeConfig = config.darkMode ? THEME_CONFIG_DARK : THEME_CONFIG_LIGHT

  const leoTheme = new LeoTheme({
    colors: [primary, accent, neutral],
    backgroundColor: neutral,
    ...themeConfig,
  })

  const leoThemeColorValues = (
    name: string,
  ): Record<string, { value: string }> | undefined =>
    (leoTheme.contrastColors as ContrastColor[])
      .find(it => it.name === name)
      ?.values.reduce(
        (result, item) => {
          result[item.name] = { value: item.value }
          return result
        },
        {} as Record<string, { value: string }>,
      )

  return {
    primary: leoThemeColorValues('primary') as unknown as ColorTones,
    accent: leoThemeColorValues('accent') as unknown as ColorTones,
    neutral: leoThemeColorValues('neutral') as unknown as ColorTones,
  }
}
