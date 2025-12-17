import { SkeletonBox } from './skeleton-box'

interface ActionItemProps {
  isDark: boolean
  iconWidth?: string
  textWidth?: string
  primaryColor?: string
  usePrimaryBg?: boolean
}

export const ActionItem = ({
  isDark,
  iconWidth = 'h-4 w-4',
  textWidth = 'h-2 w-6',
  primaryColor,
  usePrimaryBg = false,
}: ActionItemProps) => {
  const bgColor =
    usePrimaryBg && primaryColor
      ? `${primaryColor}15`
      : isDark
        ? '#404040'
        : '#f3f4f6'

  return (
    <div className="flex items-center gap-1">
      <SkeletonBox
        className={iconWidth}
        style={{
          backgroundColor:
            usePrimaryBg && primaryColor ? `${primaryColor}15` : bgColor,
        }}
      />
      <SkeletonBox
        className={textWidth}
        style={{ backgroundColor: isDark ? '#404040' : '#f3f4f6' }}
      />
    </div>
  )
}
