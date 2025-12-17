import type { Theme } from '../type'
import { SkeletonBox } from './skeleton-box'
import { ActionItem } from './action-item'

interface PostActionsProps {
  isDark: boolean
  primaryColor?: string
  theme: Theme
  usePrimaryOnFirst?: boolean
}

export const PostActions = ({
  isDark,
  primaryColor,
  theme,
  usePrimaryOnFirst,
}: PostActionsProps) => {
  const placeholderBg = isDark ? '#404040' : '#f3f4f6'

  return (
    <div
      className="flex items-center justify-between border-t pt-2"
      style={{ borderColor: theme.border }}
    >
      <div className="flex items-center gap-4">
        <ActionItem
          isDark={isDark}
          primaryColor={primaryColor}
          usePrimaryBg={usePrimaryOnFirst}
          textWidth={usePrimaryOnFirst ? 'h-2 w-8' : 'h-2 w-6'}
        />
        <ActionItem isDark={isDark} />
        <ActionItem
          isDark={isDark}
          textWidth={usePrimaryOnFirst ? 'h-2 w-10' : 'h-2 w-8'}
        />
      </div>
      <SkeletonBox
        className="h-4 w-4"
        style={{ backgroundColor: placeholderBg }}
      />
    </div>
  )
}
