import { cx } from '@/utils/cx'
import { Button } from '@/components/base/buttons/button'
import { trackEvent } from '@/utils/segment/analytics'

interface PlanCtaProps {
  planId: string
  planName?: string
  isRecommended: boolean
  isLoading: boolean
  buttonText: string
  onSubmit: () => void
  variant?: 'compact' | 'full'
  hasGrowthPlan?: boolean
  billingPeriod?: 'annual' | 'monthly'
  isMigrationUser?: boolean
}

export const PlanCta = ({
  planId,
  planName,
  isRecommended,
  isLoading,
  buttonText,
  onSubmit,
  variant = 'full',
  hasGrowthPlan,
  billingPeriod,
  isMigrationUser,
}: PlanCtaProps) => {
  const isCompact = variant === 'compact'
  const displayButtonText = planId === 'growth' ? '14-day trial' : buttonText

  const handleTalkToSales = () => {
    trackEvent('wizard_talk_to_sales_clicked', {
      plan_id: planId,
      plan_name: planName || 'Enterprise',
      is_migration_user: isMigrationUser ?? false,
    })
  }

  const handleRequestDemo = () => {
    trackEvent('wizard_request_demo_clicked', {
      plan_id: 'growth',
      plan_name: 'Growth',
      billing_period: billingPeriod,
    })
  }

  return (
    <div
      className={cx(
        'border-tertiary mt-auto border-t',
        isCompact ? 'pt-2' : 'pt-4',
      )}
    >
      <div className={cx('flex flex-col', isCompact ? 'gap-1.5' : 'gap-2')}>
        {planId === 'enterprise' ? (
          <a
            href="https://calendly.com/bettermode/demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTalkToSales}
            className={cx(
              'block w-full rounded-[80px] text-center font-semibold transition-colors',
              isRecommended
                ? 'plan-card-cta-recommended'
                : 'plan-card-cta-primary',
              isCompact ? 'px-3 py-2 text-sm' : 'px-3 py-2 text-sm',
            )}
          >
            {displayButtonText}
          </a>
        ) : (
          <Button
            className={cx(
              'w-full',
              isRecommended
                ? 'plan-card-cta-recommended'
                : 'plan-card-cta-primary',
              isCompact && '!rounded-full !py-2 !text-sm',
            )}
            color="secondary"
            size="sm"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            {displayButtonText}
          </Button>
        )}

        {planId === 'growth' ? (
          <a
            href="https://calendly.com/bettermode/demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRequestDemo}
            className={cx(
              'plan-card-cta-secondary block w-full rounded-[80px] text-center font-semibold transition-colors',
              isCompact ? 'px-3 py-2 text-sm' : 'px-3 py-2 text-sm',
            )}
          >
            Request a demo
          </a>
        ) : (
          hasGrowthPlan && (
            <div className={cx(isCompact ? 'h-[38px]' : 'h-[42px]')} />
          )
        )}
      </div>
    </div>
  )
}

interface PlanCtaCompactProps {
  planId: string
  isRecommended: boolean
  isLoading: boolean
  buttonText: string
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const PlanCtaCompact = ({
  planId,
  isRecommended,
  isLoading,
  buttonText,
  onSubmit,
}: PlanCtaCompactProps) => {
  if (planId === 'growth') {
    return (
      <div className="flex w-full flex-col items-end gap-1">
        <Button
          className={cx(
            isRecommended
              ? 'plan-card-cta-recommended'
              : 'plan-card-cta-primary',
            'w-full !rounded-full !px-2 !py-1 !text-[0.65rem] whitespace-nowrap',
          )}
          color="secondary"
          size="sm"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          14-day trial
        </Button>
        <a
          href="https://calendly.com/bettermode/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="plan-card-cta-secondary w-full rounded-full px-2 py-1 text-center text-[0.65rem] font-semibold whitespace-nowrap transition-colors"
          onClick={e => e.stopPropagation()}
        >
          Request demo
        </a>
      </div>
    )
  }

  if (planId === 'enterprise') {
    return (
      <a
        href="https://calendly.com/bettermode/demo"
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          isRecommended ? 'plan-card-cta-recommended' : 'plan-card-cta-primary',
          'w-full !rounded-full !px-2 !py-1 !text-[0.65rem] whitespace-nowrap',
          'block text-center font-semibold transition-colors',
        )}
        onClick={e => e.stopPropagation()}
      >
        {buttonText.includes('trial') ? '14-days trial' : buttonText}
      </a>
    )
  }

  return (
    <Button
      className={cx(
        isRecommended ? 'plan-card-cta-recommended' : 'plan-card-cta-primary',
        'w-full !rounded-full !px-2 !py-1 !text-[0.65rem] whitespace-nowrap',
      )}
      color="secondary"
      size="sm"
      onClick={onSubmit}
      isLoading={isLoading}
    >
      {buttonText.includes('trial') ? '14-days trial' : buttonText}
    </Button>
  )
}
