import type { Theme } from '../type'

interface UserActionsProps {
  theme: Theme
  isDark?: boolean
}

export const UserActions = ({ theme, isDark }: UserActionsProps) => (
  <div className="flex items-center gap-1.5 sm:gap-2">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="h-7 w-7 rounded-md"
        style={{ backgroundColor: theme.bgSecondary }}
      />
    ))}
    <div
      className="ml-1 h-7 w-7 rounded-full"
      style={{ backgroundColor: isDark ? '#525252' : '#d1d5db' }}
    />
  </div>
)
