import type { Plan, PlanId, BillingPeriod } from '../types'
import { PlanPrice } from './plan-price'
import { PlanFeatures } from './plan-features'
import { PlanCta } from './plan-cta'
import { SeeDetailsLink } from './see-details-link'
import { IntegrationLogos } from './integration-logos'

interface DesktopPlanContentProps {
  plan: Plan
  isRecommended: boolean
  billingPeriod: BillingPeriod
  isLoading: boolean
  selectedPlan: PlanId
  onSubmit: (plan: PlanId) => void
  hasGrowthPlan?: boolean
  isMigrationUser?: boolean
}

export const DesktopPlanContent = ({
  plan,
  isRecommended,
  billingPeriod,
  isLoading,
  selectedPlan,
  onSubmit,
  hasGrowthPlan,
  isMigrationUser,
}: DesktopPlanContentProps) => (
  <>
    <div className="mb-3">
      <div className="mb-2">
        <h3 className="text-primary flex items-center gap-1.5 text-base font-semibold">
          {plan.name}
        </h3>
      </div>
      <div className="flex min-h-[66px] flex-col justify-center">
        <PlanPrice
          price={plan.price}
          annualPrice={plan.annualPrice}
          annualTotal={plan.annualTotal}
          monthlyTotal={plan.monthlyTotal}
          billingPeriod={billingPeriod}
        />
      </div>
    </div>

    <div className="mt-4 mb-4 h-[216px]">
      <PlanFeatures features={plan.features} />
    </div>

    <div className="mt-4 mb-4">
      <p className="text-quaternary mb-2 text-xs sm:mb-3">Integrations</p>
      <IntegrationLogos planId={plan.id} />
    </div>

    <PlanCta
      planId={plan.id}
      planName={plan.name}
      isRecommended={isRecommended}
      isLoading={isLoading && plan.id === selectedPlan}
      buttonText={plan.buttonText}
      onSubmit={() => onSubmit(plan.id as PlanId)}
      hasGrowthPlan={hasGrowthPlan}
      billingPeriod={billingPeriod}
      isMigrationUser={isMigrationUser}
    />

    <SeeDetailsLink
      planId={plan.id}
      planName={plan.name}
      onClick={e => e.stopPropagation()}
    />
  </>
)
