interface SkeletonBoxProps {
  className?: string
  style?: React.CSSProperties
}

export const SkeletonBox = ({
  className = 'h-4 w-4',
  style,
}: SkeletonBoxProps) => {
  return <div className={`${className} rounded`} style={style} />
}
