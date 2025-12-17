/** Color tokens */
export interface ThemeColors {
  'action-primary': string
  'action-primary-hovered': string
  'action-primary-pressed': string
  'action-primary-subdued': string
  'action-primary-subdued-hovered': string
  'action-primary-subdued-pressed': string
  'action-primary-disabled': string
  'action-neutral': string
  'action-neutral-hovered': string
  'action-neutral-pressed': string
  'action-neutral-subdued': string
  'action-neutral-subdued-hovered': string
  'action-neutral-subdued-pressed': string
  'action-neutral-disabled': string
  'action-destructive': string
  'action-destructive-hovered': string
  'action-destructive-pressed': string
  'action-destructive-subdued': string
  'action-destructive-subdued-hovered': string
  'action-destructive-subdued-pressed': string
  'action-destructive-disabled': string
  background: string
  'background-hovered': string
  'background-pressed': string
  'background-selected': string
  'background-backdrop': string
  'background-overlay': string
  'background-divider': string
  content: string
  'content-subdued': string
  'content-muted': string
  'content-hovered': string
  'content-pressed': string
  'content-disabled': string
  'content-on-positive': string
  'content-on-attention': string
  'content-on-highlight': string
  'content-on-negative': string
  'content-on-negative-hovered': string
  'content-on-negative-pressed': string
  'content-primary': string
  'content-on-primary': string
  'content-on-inverse': string
  'content-on-destructive': string
  'content-on-interactive': string
  'content-on-background': string
  'content-on-background-subdued': string
  'content-on-background-hovered': string
  'content-on-background-pressed': string
  'content-on-background-disabled': string
  'decorative-surface-1': string
  'decorative-surface-1-subdued': string
  'decorative-content-1': string
  'decorative-surface-2': string
  'decorative-surface-2-subdued': string
  'decorative-content-2': string
  'decorative-surface-3': string
  'decorative-surface-3-subdued': string
  'decorative-content-3': string
  'decorative-surface-4': string
  'decorative-surface-4-subdued': string
  'decorative-content-4': string
  'decorative-surface-5': string
  'decorative-surface-5-subdued': string
  'decorative-content-5': string
  'decorative-surface-6': string
  'decorative-surface-6-subdued': string
  'decorative-content-6': string
  'decorative-surface-7': string
  'decorative-surface-7-subdued': string
  'decorative-content-7': string
  interactive: string
  'interactive-hovered': string
  'interactive-pressed': string
  'interactive-disabled': string
  'interactive-destructive': string
  'interactive-destructive-hovered': string
  'interactive-destructive-pressed': string
  'interactive-destructive-disabled': string
  topbar: string
  'topbar-subdued': string
  'content-on-topbar': string
  'line-on-topbar': string
  'line-on-topbar-pressed': string
  line: string
  'line-subdued': string
  'line-hovered': string
  'line-pressed': string
  'line-selected': string
  'line-disabled': string
  'line-transparent': string
  'line-positive': string
  'line-positive-subdued': string
  'line-highlight': string
  'line-highlight-subdued': string
  'line-negative': string
  'line-negative-subdued': string
  'line-negative-disabled': string
  'line-attention': string
  'line-attention-subdued': string
  link: string
  'link-hovered': string
  'link-pressed': string
  focused: string
  skeleton: string
  surface: string
  'surface-subdued': string
  'surface-hovered': string
  'surface-subdued-hovered': string
  'surface-pressed': string
  'surface-disabled': string
  'surface-selected': string
  'surface-selected-hovered': string
  'surface-selected-pressed': string
  'surface-attention': string
  'surface-attention-subdued': string
  'surface-negative': string
  'surface-negative-subdued': string
  'surface-negative-subdued-hovered': string
  'surface-negative-subdued-pressed': string
  'surface-positive': string
  'surface-positive-subdued': string
  'surface-highlight': string
  'surface-highlight-subdued': string
  'surface-highlight-subdued-hovered': string
  'surface-highlight-subdued-pressed': string
  'surface-neutral': string
  'surface-neutral-subdued': string
  'surface-inverse': string
}

export type ColorScheme = 'light1' | 'light2' | 'light3' | 'dark1' | 'dark2'

export type Palette = {
  primary: string
  accent: string
  neutral: string
}

export interface Theme {
  id: string
  name: string
  palette?: Palette
  light1: ThemeColors
  light2?: ThemeColors
  light3?: ThemeColors
  dark1: ThemeColors
  dark2?: ThemeColors
}

export interface ColorTones {
  readonly '50': string
  readonly '100': string
  readonly '200': string
  readonly '300': string
  readonly '400': string
  readonly '500': string
  readonly '600': string
  readonly '700': string
  readonly '800': string
  readonly '900': string
  readonly '950': string
}

/** Input for generating a theme - just a single brand color */
export interface GenerateThemeInput {
  /** The primary brand color in hex format (e.g., '#4F46E5') */
  color: string
}
