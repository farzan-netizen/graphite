import { cx } from '@/utils/cx'

interface BillingToggleProps {
  billingPeriod: 'annual' | 'monthly'
  onAnnualClick: () => void
  onMonthlyClick: () => void
  isMobile?: boolean
}

export const BillingToggle = ({
  billingPeriod,
  onAnnualClick,
  onMonthlyClick,
  isMobile,
}: BillingToggleProps) => {
  return (
    <div className="flex justify-center">
      <div
        className={cx(
          'bg-secondary flex rounded-lg',
          isMobile ? 'p-0.5' : 'p-1',
        )}
      >
        <button
          onClick={onAnnualClick}
          className={cx(
            'rounded-md font-medium transition-all',
            isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
            billingPeriod === 'annual'
              ? 'bg-primary text-primary shadow-sm'
              : 'text-tertiary hover:text-primary',
          )}
        >
          Annually
        </button>
        <button
          onClick={onMonthlyClick}
          className={cx(
            'rounded-md font-medium transition-all',
            isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
            billingPeriod === 'monthly'
              ? 'bg-primary text-primary shadow-sm'
              : 'text-tertiary hover:text-primary',
          )}
        >
          Monthly
        </button>
      </div>
    </div>
  )
}
