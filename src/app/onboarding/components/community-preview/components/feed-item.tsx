import type { Theme } from '../type'

interface FeedItemProps {
  primaryColor?: string
  isDark: boolean
  theme: Theme
}

export const FeedItem = ({ primaryColor, isDark, theme }: FeedItemProps) => (
  <div
    className="flex shrink-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors sm:text-sm"
    style={{
      backgroundColor: primaryColor
        ? `${primaryColor}15`
        : isDark
          ? '#404040'
          : '#f3f4f6',
      borderColor: primaryColor
        ? `${primaryColor}30`
        : isDark
          ? '#525252'
          : '#e5e7eb',
    }}
  >
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: primaryColor || (isDark ? '#a3a3a3' : '#6b7280') }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
    <span
      className="truncate font-medium"
      style={{ color: theme.textSecondary }}
    >
      Feed
    </span>
  </div>
)
