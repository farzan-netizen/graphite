import { cx } from '@/utils/cx'

interface EmptyCardProps {
  className?: string
  width?: 'sm' | 'md' | 'lg'
  height?: string
}

const widthClasses = {
  sm: 'w-[200px]',
  md: 'w-[436px]',
  lg: 'w-[436px]',
}

export const EmptyCard = ({
  className,
  width = 'md',
  height,
}: EmptyCardProps) => {
  return (
    <div
      className={cx(
        'rounded-[20px] border border-[#e7e7e7] bg-[rgba(255,255,255,0.4)] dark:border-[#2b2b2b] dark:bg-[rgba(35,35,35,0.4)]',
        widthClasses[width],
        height,
        className,
      )}
    />
  )
}
