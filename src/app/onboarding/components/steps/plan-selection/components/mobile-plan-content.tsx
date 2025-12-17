import type { MouseEvent } from 'react'
import { Accordion } from '@/components/base/accordion'
import type { Plan, PlanId, BillingPeriod } from '../types'
import { RecommendedBadge } from './recommended-badge'
import { PlanPrice } from './plan-price'
import { PlanFeatures } from './plan-features'
import { PlanCta } from './plan-cta'
import { PlanCtaCompact } from './plan-cta'
import { SeeDetailsLink } from './see-details-link'
import { IntegrationLogos } from './integration-logos'

interface MobilePlanContentProps {
  hasGrowthPlan?: boolean
  plan: Plan
  isExpanded: boolean
  isRecommended: boolean
  billingPeriod: BillingPeriod
  isLoading: boolean
  selectedPlan: PlanId
  onSubmit: (plan: PlanId) => void
  isMigrationUser?: boolean
}

export const MobilePlanContent = ({
  hasGrowthPlan,
  plan,
  isExpanded,
  isRecommended,
  billingPeriod,
  isLoading,
  selectedPlan,
  onSubmit,
  isMigrationUser,
}: MobilePlanContentProps) => {
  const previewFeatures =
    plan.essentialFeatures?.slice(0, 2) || plan.features.slice(0, 2)

  return (
    <Accordion
      isExpanded={isExpanded}
      header={
        <div className="mt-2.5 mb-1 grid grid-cols-[1fr_auto] gap-3">
          <div className="min-w-0">
            <h3 className="text-primary mb-1.5 flex items-center gap-1.5 text-base font-semibold">
              {plan.name}
              {isRecommended && <RecommendedBadge variant="inline" size="sm" />}
            </h3>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <PlanPrice
              price={plan.price}
              annualPrice={plan.annualPrice}
              billingPeriod={billingPeriod}
              variant="compact"
            />
          </div>
        </div>
      }
      collapsedContent={
        <div className="mb-1 grid grid-cols-[1fr_auto] gap-3">
          <div className="min-w-0">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-0.5">
                {previewFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <feature.icon className="text-quaternary h-2.5 w-2.5 shrink-0" />
                    <span className="text-tertiary text-[0.7rem] leading-tight">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              {plan.features.length > 2 && (
                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-quaternary text-xs font-medium">
                    +{plan.features.length - 2} more
                  </span>
                  <svg
                    className="text-quaternary h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-end gap-1">
            <PlanCtaCompact
              planId={plan.id}
              isRecommended={isRecommended}
              isLoading={isLoading && selectedPlan === plan.id}
              buttonText={plan.buttonText}
              onSubmit={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onSubmit(plan.id as PlanId)
              }}
            />
          </div>
        </div>
      }
      expandedContent={
        <>
          <div className="mb-2">
            <PlanFeatures features={plan.features} variant="compact" />
            <div className="text-quaternary mt-1 flex items-center text-[0.7rem] font-medium">
              <span className="mr-0.5">Tap to collapse</span>
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-quaternary mb-2 text-[0.7rem]">Integrations</p>
            <IntegrationLogos planId={plan.id} />
          </div>

          <div
            className="border-tertiary mt-auto border-t pt-2"
            onClick={e => e.stopPropagation()}
          >
            <PlanCta
              hasGrowthPlan={hasGrowthPlan}
              planId={plan.id}
              planName={plan.name}
              isRecommended={isRecommended}
              isLoading={isLoading && selectedPlan === plan.id}
              buttonText={plan.buttonText}
              onSubmit={() => onSubmit(plan.id as PlanId)}
              variant="compact"
              billingPeriod={billingPeriod}
              isMigrationUser={isMigrationUser}
            />
          </div>

          <div className="border-tertiary/30 mt-4 border-t">
            <SeeDetailsLink
              planId={plan.id}
              planName={plan.name}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </>
      }
    />
  )
}
