import { ColorScheme } from './types'

// Semantic palette for light mode
const SEMANTIC_PALETTE_LIGHT = {
  ref: {
    positive: {
      '50': { value: '#f2fbf5' },
      '100': { value: '#e1f8e8' },
      '200': { value: '#c1f2d0' },
      '300': { value: '#90e6af' },
      '400': { value: '#19b96c' },
      '500': { value: '#008344' },
      '600': { value: '#00612f' },
      '700': { value: '#004b22' },
      '800': { value: '#002f13' },
      '900': { value: '#001c09' },
      '950': { value: '#000802' },
    },
    negative: {
      '50': { value: '#fff5f3' },
      '100': { value: '#fff0ec' },
      '200': { value: '#ffe0da' },
      '300': { value: '#ffc7bc' },
      '400': { value: '#ff7968' },
      '500': { value: '#d83028' },
      '600': { value: '#a71613' },
      '700': { value: '#840a08' },
      '800': { value: '#580202' },
      '900': { value: '#380101' },
      '950': { value: '#180000' },
    },
    attention: {
      '50': { value: '#fff7ed' },
      '100': { value: '#fff0de' },
      '200': { value: '#ffe2bb' },
      '300': { value: '#ffcb89' },
      '400': { value: '#ee8800' },
      '500': { value: '#af5c00' },
      '600': { value: '#844200' },
      '700': { value: '#663200' },
      '800': { value: '#431e00' },
      '900': { value: '#2a1000' },
      '950': { value: '#100400' },
    },
    info: {
      '50': { value: '#f4f9ff' },
      '100': { value: '#e9f3ff' },
      '200': { value: '#d3e8ff' },
      '300': { value: '#b4d8ff' },
      '400': { value: '#61a3ff' },
      '500': { value: '#2a6edd' },
      '600': { value: '#1650ab' },
      '700': { value: '#0c3c88' },
      '800': { value: '#04255b' },
      '900': { value: '#02153a' },
      '950': { value: '#000618' },
    },
  },
}

// Semantic palette for dark mode
const SEMANTIC_PALETTE_DARK = {
  ref: {
    positive: {
      '50': { value: '#f4faf6' },
      '100': { value: '#e9f7ed' },
      '200': { value: '#cceed6' },
      '300': { value: '#a9e1bc' },
      '400': { value: '#5cb37e' },
      '500': { value: '#348054' },
      '600': { value: '#225f3c' },
      '700': { value: '#17492d' },
      '800': { value: '#0b2e1a' },
      '900': { value: '#051b0e' },
      '950': { value: '#010803' },
    },
    negative: {
      '50': { value: '#fff6f4' },
      '100': { value: '#ffefec' },
      '200': { value: '#ffdfda' },
      '300': { value: '#ffc6bd' },
      '400': { value: '#f08376' },
      '500': { value: '#bc5044' },
      '600': { value: '#90372e' },
      '700': { value: '#712821' },
      '800': { value: '#4a1712' },
      '900': { value: '#2f0b08' },
      '950': { value: '#120302' },
    },
    attention: {
      '50': { value: '#fff7f1' },
      '100': { value: '#fff0e1' },
      '200': { value: '#ffe1c3' },
      '300': { value: '#ffc997' },
      '400': { value: '#d99250' },
      '500': { value: '#9e652f' },
      '600': { value: '#764a1e' },
      '700': { value: '#5b3814' },
      '800': { value: '#3c220a' },
      '900': { value: '#241304' },
      '950': { value: '#0d0501' },
    },
    info: {
      '50': { value: '#f5f9fe' },
      '100': { value: '#ebf3ff' },
      '200': { value: '#d8e7ff' },
      '300': { value: '#bbd5ff' },
      '400': { value: '#75a2ee' },
      '500': { value: '#4471bd' },
      '600': { value: '#2e5392' },
      '700': { value: '#213f73' },
      '800': { value: '#12274c' },
      '900': { value: '#08162f' },
      '950': { value: '#020613' },
    },
  },
}

// Light mode action colors
const LIGHT_ACTION_COLORS = {
  color: {
    'action-primary': { value: '{ref.primary.500}' },
    'action-primary-hovered': { value: '{ref.primary.600}' },
    'action-primary-pressed': { value: '{ref.primary.700}' },
    'action-primary-subdued': { value: '{ref.primary.50}' },
    'action-primary-subdued-hovered': { value: '{ref.primary.100}' },
    'action-primary-subdued-pressed': { value: '{ref.primary.200}' },
    'action-primary-disabled': { value: '{ref.neutral.50}' },
    'action-neutral': { value: '{ref.white}' },
    'action-neutral-hovered': { value: '{ref.neutral.50}' },
    'action-neutral-pressed': { value: '{ref.neutral.100}' },
    'action-neutral-subdued': { value: '{ref.neutral.100}' },
    'action-neutral-subdued-hovered': { value: '{ref.neutral.200}' },
    'action-neutral-subdued-pressed': { value: '{ref.neutral.300}' },
    'action-neutral-disabled': { value: '{ref.white}' },
    'action-destructive': { value: '{ref.negative.500}' },
    'action-destructive-hovered': { value: '{ref.negative.600}' },
    'action-destructive-pressed': { value: '{ref.negative.700}' },
    'action-destructive-subdued': { value: '{ref.negative.50}' },
    'action-destructive-subdued-hovered': { value: '{ref.negative.100}' },
    'action-destructive-subdued-pressed': { value: '{ref.negative.200}' },
    'action-destructive-disabled': { value: '{ref.neutral.100}' },
  },
}

// Light mode background colors
const LIGHT_BACKGROUND_COLORS = {
  color: {
    background: { value: '{ref.neutral.100}' },
    'background-hovered': { value: '{ref.neutral.200}' },
    'background-pressed': { value: '{ref.neutral.300}' },
    'background-selected': { value: '{ref.neutral.300}' },
    'background-backdrop': {
      value: '{ref.black}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-overlay': {
      value: '{ref.white}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-divider': { value: '{ref.neutral.400}' },
  },
}

// Light mode content colors
const LIGHT_CONTENT_COLORS = {
  color: {
    content: { value: '{ref.neutral.950}' },
    'content-subdued': { value: '{ref.neutral.600}' },
    'content-muted': { value: '{ref.neutral.500}' },
    'content-hovered': { value: '{ref.neutral.900}' },
    'content-pressed': { value: '{ref.neutral.600}' },
    'content-disabled': { value: '{ref.neutral.400}' },
    'content-on-positive': { value: '{ref.positive.700}' },
    'content-on-attention': { value: '{ref.attention.700}' },
    'content-on-highlight': { value: '{ref.info.800}' },
    'content-on-negative': { value: '{ref.negative.700}' },
    'content-on-negative-hovered': { value: '{ref.negative.800}' },
    'content-on-negative-pressed': { value: '{ref.negative.900}' },
    'content-primary': { value: '{ref.primary.800}' },
    'content-on-primary': { value: '{ref.white}' },
    'content-on-inverse': { value: '{ref.neutral.50}' },
    'content-on-destructive': { value: '{ref.white}' },
    'content-on-interactive': { value: '{ref.white}' },
    'content-on-background': { value: '{color.content}' },
    'content-on-background-subdued': { value: '{color.content-subdued}' },
    'content-on-background-hovered': { value: '{color.content-hovered}' },
    'content-on-background-pressed': { value: '{color.content-pressed}' },
    'content-on-background-disabled': { value: '{color.content-disabled}' },
  },
}

// Light mode interactive colors
const LIGHT_INTERACTIVE_COLORS = {
  color: {
    interactive: { value: '{ref.primary.600}' },
    'interactive-hovered': { value: '{ref.primary.700}' },
    'interactive-pressed': { value: '{ref.primary.800}' },
    'interactive-disabled': { value: '{ref.neutral.50}' },
    'interactive-destructive': { value: '{ref.negative.500}' },
    'interactive-destructive-hovered': { value: '{ref.negative.600}' },
    'interactive-destructive-pressed': { value: '{ref.negative.700}' },
    'interactive-destructive-disabled': { value: '{ref.neutral.50}' },
  },
}

// Light mode legacy colors
const LIGHT_LEGACY_COLORS = {
  color: {
    topbar: { value: '{color.surface}' },
    'topbar-subdued': { value: '{color.surface-subdued}' },
    'content-on-topbar': { value: '{color.content}' },
    'line-on-topbar': { value: '{color.line}' },
    'line-on-topbar-pressed': { value: '{color.line-pressed}' },
    link: { value: '{ref.accent.600}' },
    'link-hovered': { value: '{ref.accent.700}' },
    'link-pressed': { value: '{ref.accent.800}' },
  },
}

// Light mode line colors
const LIGHT_LINE_COLORS = {
  color: {
    line: { value: '{ref.neutral.300}' },
    'line-subdued': { value: '{ref.neutral.200}' },
    'line-hovered': { value: '{ref.neutral.400}' },
    'line-pressed': { value: '{ref.neutral.500}' },
    'line-selected': { value: '{ref.neutral.600}' },
    'line-disabled': { value: '{ref.neutral.200}' },
    'line-transparent': {
      value: '{ref.black}',
      modify: [{ type: 'alpha', amount: '0.1' }],
    },
    'line-positive': { value: '{ref.positive.600}' },
    'line-positive-subdued': { value: '{ref.positive.300}' },
    'line-highlight': { value: '{ref.info.600}' },
    'line-highlight-subdued': { value: '{ref.info.300}' },
    'line-negative': { value: '{ref.negative.600}' },
    'line-negative-subdued': { value: '{ref.negative.300}' },
    'line-negative-disabled': { value: '{ref.negative.200}' },
    'line-attention': { value: '{ref.attention.600}' },
    'line-attention-subdued': { value: '{ref.attention.300}' },
  },
}

// Light mode misc colors
const LIGHT_MISC_COLORS = {
  color: {
    focused: { value: '{ref.primary.600}' },
    skeleton: { value: '{ref.neutral.200}' },
  },
}

// Light mode surface colors
const LIGHT_SURFACE_COLORS = {
  color: {
    surface: { value: '{ref.white}' },
    'surface-subdued': { value: '{ref.neutral.100}' },
    'surface-hovered': { value: '{ref.neutral.100}' },
    'surface-subdued-hovered': { value: '{ref.neutral.200}' },
    'surface-pressed': { value: '{ref.neutral.200}' },
    'surface-disabled': { value: '{ref.neutral.50}' },
    'surface-selected': { value: '{ref.primary.50}' },
    'surface-selected-hovered': { value: '{ref.primary.100}' },
    'surface-selected-pressed': { value: '{ref.primary.200}' },
    'surface-attention': { value: '{ref.attention.200}' },
    'surface-attention-subdued': { value: '{ref.attention.50}' },
    'surface-negative': { value: '{ref.negative.200}' },
    'surface-negative-subdued': { value: '{ref.negative.50}' },
    'surface-negative-subdued-hovered': { value: '{ref.negative.100}' },
    'surface-negative-subdued-pressed': { value: '{ref.negative.200}' },
    'surface-positive': { value: '{ref.positive.200}' },
    'surface-positive-subdued': { value: '{ref.positive.50}' },
    'surface-highlight': { value: '{ref.info.200}' },
    'surface-highlight-subdued': { value: '{ref.info.50}' },
    'surface-highlight-subdued-hovered': { value: '{ref.info.100}' },
    'surface-highlight-subdued-pressed': { value: '{ref.info.200}' },
    'surface-neutral': { value: '{ref.neutral.200}' },
    'surface-neutral-subdued': { value: '{ref.neutral.50}' },
    'surface-inverse': { value: '{ref.neutral.900}' },
  },
}

// Dark mode action colors
const DARK_ACTION_COLORS = {
  color: {
    'action-primary': { value: '{ref.primary.500}' },
    'action-primary-hovered': { value: '{ref.primary.600}' },
    'action-primary-pressed': { value: '{ref.primary.700}' },
    'action-primary-subdued': { value: '{ref.primary.700}' },
    'action-primary-subdued-hovered': { value: '{ref.primary.600}' },
    'action-primary-subdued-pressed': { value: '{ref.primary.600}' },
    'action-primary-disabled': { value: '{ref.neutral.700}' },
    'action-neutral': { value: '{ref.neutral.800}' },
    'action-neutral-hovered': { value: '{ref.neutral.700}' },
    'action-neutral-pressed': { value: '{ref.neutral.600}' },
    'action-neutral-subdued': { value: '{ref.neutral.800}' },
    'action-neutral-subdued-hovered': { value: '{ref.neutral.700}' },
    'action-neutral-subdued-pressed': { value: '{ref.neutral.600}' },
    'action-neutral-disabled': { value: '{ref.neutral.700}' },
    'action-destructive': { value: '{ref.negative.500}' },
    'action-destructive-hovered': { value: '{ref.negative.600}' },
    'action-destructive-pressed': { value: '{ref.negative.700}' },
    'action-destructive-subdued': { value: '{ref.negative.800}' },
    'action-destructive-subdued-hovered': { value: '{ref.negative.700}' },
    'action-destructive-subdued-pressed': { value: '{ref.negative.600}' },
    'action-destructive-disabled': { value: '{ref.neutral.700}' },
  },
}

// Dark mode background colors
const DARK_BACKGROUND_COLORS = {
  color: {
    background: { value: '{ref.neutral.900}' },
    'background-hovered': {
      value: '{ref.neutral.800}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-pressed': { value: '{ref.neutral.800}' },
    'background-selected': { value: '{ref.neutral.800}' },
    'background-backdrop': {
      value: '{ref.black}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-overlay': {
      value: '{ref.black}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-divider': { value: '{ref.neutral.400}' },
  },
}

// Dark mode content colors
const DARK_CONTENT_COLORS = {
  color: {
    content: { value: '{ref.neutral.50}' },
    'content-subdued': { value: '{ref.neutral.300}' },
    'content-muted': { value: '{ref.neutral.400}' },
    'content-hovered': { value: '{ref.neutral.100}' },
    'content-pressed': { value: '{color.content-subdued}' },
    'content-disabled': { value: '{ref.neutral.500}' },
    'content-on-positive': { value: '{ref.positive.200}' },
    'content-on-attention': { value: '{ref.attention.200}' },
    'content-on-highlight': { value: '{ref.info.200}' },
    'content-on-negative': { value: '{ref.negative.200}' },
    'content-on-negative-hovered': { value: '{ref.negative.300}' },
    'content-on-negative-pressed': { value: '{ref.negative.300}' },
    'content-primary': { value: '{ref.primary.100}' },
    'content-on-primary': { value: '{ref.white}' },
    'content-on-inverse': { value: '{ref.neutral.900}' },
    'content-on-destructive': { value: '{color.content}' },
    'content-on-interactive': { value: '{color.content}' },
    'content-on-background': { value: '{color.content}' },
    'content-on-background-subdued': { value: '{color.content-subdued}' },
    'content-on-background-hovered': { value: '{color.content-hovered}' },
    'content-on-background-pressed': { value: '{color.content-pressed}' },
    'content-on-background-disabled': { value: '{color.content-disabled}' },
  },
}

// Dark mode interactive colors
const DARK_INTERACTIVE_COLORS = {
  color: {
    interactive: { value: '{ref.primary.500}' },
    'interactive-hovered': { value: '{ref.primary.600}' },
    'interactive-pressed': { value: '{ref.primary.700}' },
    'interactive-disabled': { value: '{ref.neutral.900}' },
    'interactive-destructive': { value: '{ref.negative.500}' },
    'interactive-destructive-hovered': { value: '{ref.negative.600}' },
    'interactive-destructive-pressed': { value: '{ref.negative.700}' },
    'interactive-destructive-disabled': { value: '{ref.neutral.900}' },
  },
}

// Dark mode legacy colors
const DARK_LEGACY_COLORS = {
  color: {
    topbar: { value: '{color.surface}' },
    'topbar-subdued': { value: '{color.surface-subdued}' },
    'content-on-topbar': { value: '{color.content}' },
    'line-on-topbar': { value: '{color.line}' },
    'line-on-topbar-pressed': { value: '{color.line-pressed}' },
    link: { value: '{ref.accent.300}' },
    'link-hovered': { value: '{ref.accent.400}' },
    'link-pressed': { value: '{ref.accent.500}' },
  },
}

// Dark mode line colors
const DARK_LINE_COLORS = {
  color: {
    line: {
      value: '{ref.neutral.600}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'line-subdued': { value: '{ref.neutral.700}' },
    'line-hovered': { value: '{ref.neutral.600}' },
    'line-pressed': { value: '{ref.neutral.500}' },
    'line-selected': { value: '{ref.neutral.600}' },
    'line-disabled': { value: '{ref.neutral.700}' },
    'line-transparent': {
      value: '{ref.white}',
      modify: [{ type: 'alpha', amount: '0.1' }],
    },
    'line-positive': { value: '{ref.positive.900}' },
    'line-positive-subdued': { value: '{ref.positive.900}' },
    'line-highlight': { value: '{ref.info.900}' },
    'line-highlight-subdued': { value: '{ref.info.900}' },
    'line-negative': { value: '{ref.negative.900}' },
    'line-negative-subdued': { value: '{ref.negative.900}' },
    'line-negative-disabled': { value: '{ref.negative.700}' },
    'line-attention': { value: '{ref.attention.900}' },
    'line-attention-subdued': { value: '{ref.attention.900}' },
  },
}

// Dark mode misc colors
const DARK_MISC_COLORS = {
  color: {
    focused: { value: '{ref.primary.500}' },
    skeleton: { value: '{ref.neutral.700}' },
  },
}

// Dark mode surface colors
const DARK_SURFACE_COLORS = {
  color: {
    surface: { value: '{ref.neutral.800}' },
    'surface-subdued': { value: '{ref.neutral.700}' },
    'surface-hovered': { value: '{ref.neutral.700}' },
    'surface-subdued-hovered': { value: '{ref.neutral.600}' },
    'surface-pressed': { value: '{ref.neutral.600}' },
    'surface-disabled': { value: '{ref.neutral.700}' },
    'surface-selected': { value: '{ref.primary.700}' },
    'surface-selected-hovered': { value: '{ref.primary.600}' },
    'surface-selected-pressed': { value: '{ref.primary.600}' },
    'surface-attention': {
      value: '{ref.attention.700}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-attention-subdued': {
      value: '{ref.attention.800}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-negative': {
      value: '{ref.negative.700}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-negative-subdued': {
      value: '{ref.negative.800}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-negative-subdued-hovered': {
      value: '{ref.negative.900}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-negative-subdued-pressed': {
      value: '{ref.negative.900}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-positive': {
      value: '{ref.positive.700}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-positive-subdued': {
      value: '{ref.positive.800}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-highlight': {
      value: '{ref.info.700}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-highlight-subdued': {
      value: '{ref.info.800}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-highlight-subdued-hovered': {
      value: '{ref.info.900}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-highlight-subdued-pressed': {
      value: '{ref.info.900}',
      modify: [{ type: 'alpha', amount: '0.3' }],
    },
    'surface-neutral': { value: '{ref.neutral.600}' },
    'surface-neutral-subdued': { value: '{ref.neutral.700}' },
    'surface-inverse': { value: '{color.content}' },
  },
}

// Decorative colors (same for both modes)
const DECORATIVE_COLORS = {
  color: {
    'decorative-surface-1': { value: '#FFC96B' },
    'decorative-surface-1-subdued': { value: '#FFE4B5' },
    'decorative-content-1': { value: '#7E5700' },
    'decorative-surface-2': { value: '#FFC4B0' },
    'decorative-surface-2-subdued': { value: '#FFE1D7' },
    'decorative-content-2': { value: '#AF294E' },
    'decorative-surface-3': { value: '#92E6B5' },
    'decorative-surface-3-subdued': { value: '#C9F3DA' },
    'decorative-content-3': { value: '#006D41' },
    'decorative-surface-4': { value: '#91E0D6' },
    'decorative-surface-4-subdued': { value: '#C8EFEB' },
    'decorative-content-4': { value: '#006A68' },
    'decorative-surface-5': { value: '#FDC9D0' },
    'decorative-surface-5-subdued': { value: '#FEE4E7' },
    'decorative-content-5': { value: '#AE2B4C' },
    'decorative-surface-6': { value: '#7CD4FD' },
    'decorative-surface-6-subdued': { value: '#BDE9FE' },
    'decorative-content-6': { value: '#065986' },
    'decorative-surface-7': { value: '#BDB4FE' },
    'decorative-surface-7-subdued': { value: '#DED9FF' },
    'decorative-content-7': { value: '#4A1FB8' },
  },
}

// Color scheme specific overrides
const LIGHT2_OVERRIDES = {
  color: {
    background: { value: '{ref.white}' },
    'background-hovered': { value: '{ref.neutral.100}' },
    'background-pressed': { value: '{ref.neutral.200}' },
    'background-selected': { value: '{ref.neutral.200}' },
    surface: { value: '{ref.white}' },
    'surface-subdued': { value: '{ref.neutral.100}' },
    'surface-hovered': { value: '{ref.neutral.100}' },
    'surface-subdued-hovered': { value: '{ref.neutral.200}' },
    'surface-pressed': { value: '{ref.neutral.200}' },
    'surface-disabled': { value: '{ref.neutral.50}' },
  },
}

const LIGHT3_OVERRIDES = {
  color: {
    background: { value: '{ref.white}' },
    'background-hovered': { value: '{ref.neutral.100}' },
    'background-pressed': { value: '{ref.neutral.200}' },
    'background-selected': { value: '{ref.neutral.200}' },
    surface: { value: '{ref.neutral.100}' },
    'surface-subdued': { value: '{ref.neutral.200}' },
    'surface-hovered': { value: '{ref.neutral.200}' },
    'surface-subdued-hovered': { value: '{ref.neutral.300}' },
    'surface-pressed': { value: '{ref.neutral.300}' },
    'surface-disabled': { value: '{ref.neutral.50}' },
    'action-neutral': { value: '{color.surface}' },
    'action-neutral-hovered': { value: '{color.surface-hovered}' },
    'action-neutral-pressed': { value: '{color.surface-pressed}' },
    'action-neutral-subdued': { value: '{color.surface-subdued}' },
    'action-neutral-subdued-hovered': {
      value: '{color.surface-subdued-hovered}',
    },
    'action-neutral-subdued-pressed': {
      value: '{color.surface-subdued-hovered}',
    },
    'action-neutral-disabled': { value: '{color.surface-disabled}' },
  },
}

const DARK2_OVERRIDES = {
  color: {
    background: { value: '{ref.neutral.800}' },
    'background-hovered': {
      value: '{ref.neutral.700}',
      modify: [{ type: 'alpha', amount: '0.5' }],
    },
    'background-pressed': { value: '{ref.neutral.700}' },
    'background-selected': { value: '{ref.neutral.700}' },
    surface: { value: '{ref.neutral.900}' },
    'surface-subdued': { value: '{ref.neutral.800}' },
    'surface-hovered': { value: '{ref.neutral.800}' },
    'surface-subdued-hovered': { value: '{ref.neutral.700}' },
    'surface-pressed': { value: '{ref.neutral.700}' },
    'surface-disabled': { value: '{ref.neutral.800}' },
    'action-neutral': { value: '{color.surface}' },
    'action-neutral-hovered': { value: '{color.surface-hovered}' },
    'action-neutral-pressed': { value: '{color.surface-pressed}' },
    'action-neutral-subdued': { value: '{color.surface-subdued}' },
    'action-neutral-subdued-hovered': {
      value: '{color.surface-subdued-hovered}',
    },
    'action-neutral-subdued-pressed': {
      value: '{color.surface-subdued-hovered}',
    },
    'action-neutral-disabled': { value: '{color.surface-disabled}' },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TokenRecord = Record<string, any>

export const getSemanticPalette = (colorScheme: ColorScheme): TokenRecord => {
  return colorScheme.startsWith('dark')
    ? SEMANTIC_PALETTE_DARK
    : SEMANTIC_PALETTE_LIGHT
}

export const getColorTokens = (colorScheme: ColorScheme): TokenRecord[] => {
  const isLight = colorScheme.startsWith('light')

  const baseTokens = isLight
    ? [
        LIGHT_ACTION_COLORS,
        LIGHT_BACKGROUND_COLORS,
        LIGHT_CONTENT_COLORS,
        LIGHT_INTERACTIVE_COLORS,
        LIGHT_LEGACY_COLORS,
        LIGHT_LINE_COLORS,
        LIGHT_MISC_COLORS,
        LIGHT_SURFACE_COLORS,
      ]
    : [
        DARK_ACTION_COLORS,
        DARK_BACKGROUND_COLORS,
        DARK_CONTENT_COLORS,
        DARK_INTERACTIVE_COLORS,
        DARK_LEGACY_COLORS,
        DARK_LINE_COLORS,
        DARK_MISC_COLORS,
        DARK_SURFACE_COLORS,
      ]

  // Add color scheme specific overrides
  const overrides: TokenRecord[] = []
  if (colorScheme === 'light2') {
    overrides.push(LIGHT2_OVERRIDES)
  } else if (colorScheme === 'light3') {
    overrides.push(LIGHT3_OVERRIDES)
  } else if (colorScheme === 'dark2') {
    overrides.push(DARK2_OVERRIDES)
  }

  return [...baseTokens, DECORATIVE_COLORS, ...overrides]
}
