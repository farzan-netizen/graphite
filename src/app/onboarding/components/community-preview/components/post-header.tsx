import { SkeletonBox } from './skeleton-box'
import { SkeletonCircle } from './skeleton-circle'

interface PostHeaderProps {
  avatarBg: string
  nameBg: string
  placeholderBg: string
  nameWidth: string
  dateWidth: string
}

export const PostHeader = ({
  avatarBg,
  nameBg,
  placeholderBg,
  nameWidth,
  dateWidth,
}: PostHeaderProps) => (
  <div className="mb-3 flex items-center gap-3">
    <SkeletonCircle style={{ backgroundColor: avatarBg }} />
    <div className="flex-1">
      <SkeletonBox
        className={`mb-1 h-3 ${nameWidth}`}
        style={{ backgroundColor: nameBg }}
      />
      <SkeletonBox
        className={`h-2 ${dateWidth}`}
        style={{ backgroundColor: placeholderBg }}
      />
    </div>
    <SkeletonBox
      className="h-5 w-5"
      style={{ backgroundColor: placeholderBg }}
    />
  </div>
)
