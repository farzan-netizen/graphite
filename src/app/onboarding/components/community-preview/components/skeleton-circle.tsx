interface SkeletonCircleProps {
  size?: string
  style?: React.CSSProperties
}

export const SkeletonCircle = ({
  size = 'h-8 w-8',
  style,
}: SkeletonCircleProps) => {
  return <div className={`${size} shrink-0 rounded-full`} style={style} />
}
