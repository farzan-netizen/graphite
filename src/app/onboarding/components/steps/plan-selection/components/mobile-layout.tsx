import type { ReactNode } from 'react'
import type { onboardingSelectForm } from '@/store/onboarding'
import type { brandSelectState } from '@/store/brand'
import type { Plan, BillingPeriod } from '../types'
import {
  generatePlanRecommendationText,
  generatePlanRecommendationTextMobile,
} from '../utils'
import { BillingToggle } from './billing-toggle'
import { StaticTextRenderer } from './static-text-renderer'

interface MobileLayoutProps {
  formData: ReturnType<typeof onboardingSelectForm>
  recommendedPlanType: string
  brandData: ReturnType<typeof brandSelectState>
  billingPeriod: BillingPeriod
  plans: Plan[]
  onAnnualClick: () => void
  onMonthlyClick: () => void
  renderPlanCard: (plan: Plan, index: number) => ReactNode
}

export const MobileLayout = ({
  formData,
  recommendedPlanType,
  brandData,
  billingPeriod,
  plans,
  onAnnualClick,
  onMonthlyClick,
  renderPlanCard,
}: MobileLayoutProps) => (
  <>
    <div className="mx-auto mb-2 w-full max-w-md sm:max-w-lg">
      <StaticTextRenderer
        text={
          generatePlanRecommendationTextMobile(
            formData,
            recommendedPlanType,
            brandData,
          ).title
        }
        className="text-primary text-left text-sm leading-relaxed font-normal sm:text-base lg:text-lg"
      />
    </div>

    <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:max-w-lg">
      <BillingToggle
        billingPeriod={billingPeriod}
        onAnnualClick={onAnnualClick}
        onMonthlyClick={onMonthlyClick}
        isMobile
      />

      <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan, index) => renderPlanCard(plan, index))}
      </div>
    </div>

    <div className="mx-auto mt-6 w-full max-w-md text-left sm:max-w-lg">
      <StaticTextRenderer
        text={generatePlanRecommendationText(
          formData,
          recommendedPlanType,
          brandData,
        ).replace(/^##\*\*[^\n]+\*\*\n\n/, '')}
        className="text-primary text-left text-sm leading-relaxed font-normal sm:text-base lg:text-lg"
      />
      <div className="mt-10 flex flex-col gap-3">
        <div className="border-tertiary h-px w-full border-t" />
        <p className="text-quaternary text-xs">
          © {new Date().getFullYear()} Bettermode. All rights reserved.
        </p>
      </div>
    </div>
  </>
)
