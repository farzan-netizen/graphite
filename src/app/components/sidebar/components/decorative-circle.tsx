import { cx } from '@/utils/cx'

interface DecorativeCircleProps {
  className?: string
}

export const DecorativeCircle = ({ className }: DecorativeCircleProps) => {
  return (
    <div className={cx('absolute h-[266px] w-[110px] opacity-10', className)}>
      <svg
        width="110"
        height="266"
        viewBox="0 0 110 266"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="55"
          cy="133"
          r="55"
          className="fill-[#E7E7E7] dark:fill-[#353535]"
        />
      </svg>
    </div>
  )
}
