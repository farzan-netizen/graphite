import { cx } from '@/utils/cx'

interface PlanPriceProps {
  price: string
  annualPrice?: string | null
  annualTotal?: string
  monthlyTotal?: string
  billingPeriod: 'annual' | 'monthly'
  variant?: 'compact' | 'full'
}

export const PlanPrice = ({
  price,
  annualPrice,
  annualTotal,
  monthlyTotal,
  billingPeriod,
  variant = 'full',
}: PlanPriceProps) => {
  const isAnnual = billingPeriod === 'annual'
  const hasDiscount = isAnnual && annualPrice && price !== annualPrice

  if (variant === 'compact') {
    return (
      <div className="flex items-baseline gap-0.5">
        {hasDiscount ? (
          <>
            <span className="text-primary text-lg font-bold">
              {annualPrice}
            </span>
            <span className="text-tertiary text-[0.6rem]">/m</span>
          </>
        ) : (
          <>
            <span className="text-primary text-lg font-bold">{price}</span>
            {price !== 'Contact Us' && (
              <span className="text-tertiary text-[0.6rem]">/m</span>
            )}
          </>
        )}
      </div>
    )
  }

  if (hasDiscount) {
    const savingsPercent = Math.round(
      ((parseFloat(price.replace('$', '').replace(',', '')) -
        parseFloat(annualPrice!.replace('$', '').replace(',', ''))) /
        parseFloat(price.replace('$', '').replace(',', ''))) *
        100,
    )

    return (
      <div className="flex flex-col">
        <div className={cx('mb-2 flex items-center gap-1 sm:gap-2')}>
          <span
            className={cx(
              'text-quaternary text-[0.9rem] font-bold line-through',
            )}
          >
            {price}
          </span>
          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            Save {savingsPercent}%
          </span>
        </div>
        <div className="flex items-baseline">
          <span className={cx('text-primary text-3xl font-bold')}>
            {annualPrice}
          </span>
          <span className={cx('text-tertiary ml-1 text-sm')}>/m</span>
          <span className={cx('text-quaternary ml-2 text-sm')}>
            {annualTotal}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center pb-1.5">
      <div className="flex items-baseline">
        <span className={cx('text-primary text-3xl font-bold')}>{price}</span>
        {price !== 'Contact Us' && (
          <span className={cx('text-tertiary ml-1 text-sm')}>/m</span>
        )}
        {billingPeriod === 'monthly' &&
          monthlyTotal &&
          monthlyTotal !== 'Not Available' &&
          monthlyTotal !== 'Contact Us' && (
            <span className={cx('text-quaternary ml-2 text-sm')}>
              {monthlyTotal}
            </span>
          )}
      </div>
      {billingPeriod === 'monthly' && monthlyTotal === 'Not Available' && (
        <div className={cx('text-primary mt-1 text-sm font-medium')}>
          Only Annually
        </div>
      )}
    </div>
  )
}
