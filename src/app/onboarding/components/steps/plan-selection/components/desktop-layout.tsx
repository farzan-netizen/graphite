import type { ReactNode } from 'react'
import type { onboardingSelectForm } from '@/store/onboarding'
import type { brandSelectState } from '@/store/brand'
import { cx } from '@/utils/cx'
import { Image } from '@/components/base/image'
import { TypingAnimation } from '@/components/base/typing-animation'
import type { Plan, BillingPeriod } from '../types'
import { generatePlanRecommendationText } from '../utils'
import { BillingToggle } from './billing-toggle'

interface DesktopLayoutProps {
  formData: ReturnType<typeof onboardingSelectForm>
  recommendedPlanType: string
  brandData: ReturnType<typeof brandSelectState>
  billingPeriod: BillingPeriod
  isMobile: boolean
  plans: Plan[]
  onAnnualClick: () => void
  onMonthlyClick: () => void
  renderPlanCard: (plan: Plan, index: number) => ReactNode
}

export const DesktopLayout = ({
  formData,
  recommendedPlanType,
  brandData,
  billingPeriod,
  isMobile,
  plans,
  onAnnualClick,
  onMonthlyClick,
  renderPlanCard,
}: DesktopLayoutProps) => (
  <div className="grid w-full min-w-[300px] grid-cols-1 gap-4 sm:gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
    <div className="flex flex-col gap-3 sm:gap-8 lg:gap-12">
      <div className={cx('flex items-center', isMobile ? 'pt-0' : 'pt-2')}>
        <Image
          src="/logo-bettermode.svg"
          alt="bettermode"
          className="logo-filter h-5 w-auto"
          width={20}
          height={20}
        />
      </div>
      <div className="text-left">
        <div className={cx(isMobile ? 'space-y-2' : 'space-y-4')}>
          {formData && (
            <TypingAnimation
              startOnView={true}
              duration={45}
              className="text-primary text-left text-lg leading-relaxed font-normal sm:text-xl"
            >
              {generatePlanRecommendationText(
                formData,
                recommendedPlanType,
                brandData,
              )}
            </TypingAnimation>
          )}
        </div>
      </div>
    </div>

    <div className={cx('flex flex-col', isMobile ? 'gap-3' : 'gap-6')}>
      <BillingToggle
        billingPeriod={billingPeriod}
        onAnnualClick={onAnnualClick}
        onMonthlyClick={onMonthlyClick}
        isMobile={isMobile}
      />

      <div
        className={cx(
          'grid grid-cols-1 gap-2 sm:gap-4',
          plans.length === 2
            ? 'lg:grid-cols-2'
            : 'lg:grid-cols-2 xl:grid-cols-3',
        )}
      >
        {plans.map((plan, index) => renderPlanCard(plan, index))}
      </div>
    </div>
  </div>
)
