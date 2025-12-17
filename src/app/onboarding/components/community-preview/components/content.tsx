import type { Theme } from '../type'
import { PostCard } from './post-card'

interface Props {
  primaryColor?: string
  isDark: boolean
  theme: Theme
}

export const CommunityPreviewContent = ({
  primaryColor,
  isDark,
  theme,
}: Props) => {
  return (
    <div className="space-y-4 overflow-hidden">
      <PostCard
        primaryColor={primaryColor}
        isDark={isDark}
        theme={theme}
        showImage
        nameWidth="max-w-28"
        dateWidth="w-16"
      />
      <PostCard
        primaryColor={primaryColor}
        isDark={isDark}
        theme={theme}
        nameWidth="max-w-32"
        dateWidth="w-20"
        showSecondTextLine
      />
    </div>
  )
}
