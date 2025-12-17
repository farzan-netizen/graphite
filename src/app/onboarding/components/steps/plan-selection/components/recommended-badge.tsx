import { cx } from '@/utils/cx'

interface RecommendedBadgeProps {
  variant?: 'absolute' | 'inline'
  size?: 'sm' | 'md'
}

export const RecommendedBadge = ({
  variant = 'absolute',
  size = 'md',
}: RecommendedBadgeProps) => {
  if (variant === 'absolute') {
    return (
      <div className={cx('absolute -top-4 left-1 sm:left-3')}>
        <span
          className="rounded-lg px-2 py-1 text-xs font-medium"
          style={{ backgroundColor: '#BFEACF', color: '#097444' }}
        >
          Recommended
        </span>
      </div>
    )
  }

  return (
    <span
      className={cx(
        'rounded font-medium',
        size === 'sm' ? 'px-1 py-0.5 text-[0.6rem]' : 'px-2 py-1 text-xs',
      )}
      style={{ backgroundColor: '#BFEACF', color: '#097444' }}
    >
      Recommended
    </span>
  )
}
