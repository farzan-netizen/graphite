import { SkeletonBox } from './skeleton-box'

interface PostBodyProps {
  placeholderBg: string
  showSecondLine?: boolean
}

export const PostBody = ({ placeholderBg, showSecondLine }: PostBodyProps) => (
  <div className="mb-3">
    <SkeletonBox
      className="mb-2 h-3 w-full"
      style={{ backgroundColor: placeholderBg }}
    />
    <SkeletonBox
      className={`h-3 w-3/4 ${showSecondLine ? 'mb-2' : ''}`}
      style={{ backgroundColor: placeholderBg }}
    />
  </div>
)
