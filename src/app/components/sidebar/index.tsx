import { useAppSelector } from '@/hooks/store'
import { onboardingSelectCurrentStep } from '@/store/onboarding'

import { EmptyCard } from './components/empty-card'
import { SideColumns } from './components/side-columns'
import { EnterpriseContent } from './components/enterprise-content'
import { IntegrationsCard } from './components/integrations-card'
import { MainContentCard } from './components/main-content-card'
import { TestimonialCard } from './components/testimonial-card'
import { CompanyLogosCard } from './components/company-logos-card'

export const SignupSideBar = () => {
  const currentStep = useAppSelector(onboardingSelectCurrentStep)

  const isEnterprise = currentStep === 5
  const isIntegrations = currentStep === 4
  const isEmail = currentStep === 1
  const showTestimonial = !isEmail && !isIntegrations && !isEnterprise

  return (
    <div className="bg-primary relative hidden w-[580px] p-6 lg:flex lg:flex-col dark:bg-[#0C0E12]">
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-4xl bg-neutral-100 p-6 lg:p-8 dark:bg-[#1F1F1F]">
        <div className="relative flex flex-col items-center gap-[16px]">
          <SideColumns position="left" />
          <SideColumns position="right" />

          {!isEnterprise && (
            <EmptyCard className={isEmail ? 'h-[200px]' : 'h-[150px]'} />
          )}

          <div className="relative flex justify-center">
            <div className="relative flex flex-col gap-[16px]">
              {isEnterprise ? (
                <EnterpriseContent />
              ) : isIntegrations ? (
                <IntegrationsCard />
              ) : (
                <MainContentCard isLargeText={isEmail} />
              )}

              {showTestimonial && <TestimonialCard step={currentStep} />}

              {!isEnterprise && <CompanyLogosCard isAnimated={isEmail} />}
            </div>
          </div>

          {!isEnterprise && (
            <EmptyCard className={isEmail ? 'h-[200px]' : 'h-[150px]'} />
          )}
        </div>
      </div>
    </div>
  )
}
