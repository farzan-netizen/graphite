import type { Theme } from '../type'
import { PostHeader } from './post-header'
import { PostBody } from './post-body'
import { PostActions } from './post-actions'

interface PostCardProps {
  primaryColor?: string
  isDark: boolean
  theme: Theme
  showImage?: boolean
  nameWidth?: string
  dateWidth?: string
  showSecondTextLine?: boolean
}

export const PostCard = ({
  primaryColor,
  isDark,
  theme,
  showImage,
  nameWidth = 'max-w-28',
  dateWidth = 'w-16',
  showSecondTextLine,
}: PostCardProps) => {
  const placeholderBg = isDark ? '#404040' : '#f3f4f6'
  const avatarBg = primaryColor
    ? `${primaryColor}15`
    : isDark
      ? '#404040'
      : '#d1d5db'
  const nameBg = primaryColor
    ? `${primaryColor}20`
    : isDark
      ? '#525252'
      : '#d1d5db'
  const imageBg = primaryColor
    ? `${primaryColor}20`
    : isDark
      ? '#404040'
      : '#e5e7eb'

  return (
    <div
      className="rounded-lg border p-4"
      style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
    >
      <PostHeader
        avatarBg={avatarBg}
        nameBg={nameBg}
        placeholderBg={placeholderBg}
        nameWidth={nameWidth}
        dateWidth={dateWidth}
      />

      <PostBody
        placeholderBg={placeholderBg}
        showSecondLine={showSecondTextLine}
      />

      {showImage && (
        <div
          className="mb-3 h-24 w-full rounded-lg"
          style={{ backgroundColor: imageBg }}
        />
      )}

      <PostActions
        isDark={isDark}
        primaryColor={primaryColor}
        theme={theme}
        usePrimaryOnFirst={!showImage}
      />
    </div>
  )
}
