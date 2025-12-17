import type { Theme } from '../type'

interface SpaceGroupProps {
  title?: string
  items: Array<{
    id: string
    name: string
    icon: React.ComponentType<{
      className?: string
      style?: React.CSSProperties
    }>
  }>
  primaryColor?: string
  isDark: boolean
  theme: Theme
}

export const SpaceGroup = ({
  title,
  items,
  primaryColor,
  isDark,
  theme,
}: SpaceGroupProps) => (
  <div className="mt-3">
    {title && (
      <div
        className="mb-1 shrink-0 text-[10px] font-medium tracking-wide uppercase"
        style={{ color: theme.textTertiary }}
      >
        {title}
      </div>
    )}
    {items.map(space => {
      const IconComponent = space.icon
      return (
        <div
          key={space.id}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors sm:text-sm"
          style={{ backgroundColor: 'transparent' }}
        >
          <IconComponent
            className="h-4 w-4 shrink-0"
            style={{ color: primaryColor || (isDark ? '#a3a3a3' : '#6b7280') }}
          />
          <span
            className="truncate font-medium"
            style={{ color: theme.textSecondary }}
          >
            {space.name}
          </span>
        </div>
      )
    })}
  </div>
)
