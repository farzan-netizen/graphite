import type { Theme } from '../type'

interface BrowserBarProps {
  communityName?: string
  theme: Theme
}

export const BrowserBar = ({ communityName, theme }: BrowserBarProps) => (
  <div
    className="shrink-0 border-b px-2 py-2 sm:px-4 sm:py-3"
    style={{
      backgroundColor: theme.bgSecondary,
      borderColor: theme.border,
    }}
  >
    <div className="mb-2 flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-red-400" />
      <div className="h-3 w-3 rounded-full bg-yellow-400" />
      <div className="h-3 w-3 rounded-full bg-green-400" />
    </div>
    <div
      className="truncate rounded-md border px-2 py-1 text-xs sm:px-3"
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
        color: theme.textTertiary,
      }}
    >
      {communityName
        ? `${communityName.trim().toLowerCase().replace(/\s+/g, '-')}.community`
        : 'yourcommunity.community'}
    </div>
  </div>
)
