'use client'

import { useEffect, useRef } from 'react'
import { PageContainer } from '@/app/components/page-container'
import { useSegmentIdentifyOnboarding } from '@/hooks/analytics'
import { useAbandonmentTracking } from '@/hooks/use-abandonment-tracking'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  onboardingGoToPrevStep,
  onboardingSelectCurrentStep,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { trackEvent } from '@/utils/segment/analytics'

import { SignupSideBar } from '../components/sidebar'
import { SignupBasicInfoStep } from './components/steps/basic-info'
import { SignupEnterpriseStep } from './components/steps/enterprise'
import { SignupIndustryStep } from './components/steps/industry'
import { SignupIntegrationsStep } from './components/steps/integrations'
import { SignupRoleStep } from './components/steps/role'
import { CommunityNameStep } from './components/steps/community-name'
import { WizardBrandingStep } from './components/steps/branding'
import { WizardSpacesStep } from './components/steps/spaces'
import { WizardPlanSelectionStep } from './components/steps/plan-selection'
import { CommunityPreview } from './components/community-preview'
import { useAnimationDirection } from './use-animation-direction'
import { WizardObjectivesStep } from './components/steps/objectives'

const COMMUNITY_STEPS_START = 7

const STEP_NAMES: Record<number, string> = {
  1: 'basic_info',
  2: 'industry',
  3: 'role',
  4: 'integrations',
  5: 'enterprise_features',
  6: 'community_name',
  7: 'objectives',
  8: 'branding',
  9: 'spaces',
  10: 'plan_selection',
}

export default function OnboardingPage() {
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(onboardingSelectCurrentStep)
  const direction = useAnimationDirection({ currentStep })
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now()
    }
  }, [])

  // Identify user with form data as it changes (for Salesforce/Mixpanel sync)
  useSegmentIdentifyOnboarding()

  const prevStepRef = useRef(currentStep)
  const wizardStartTimeRef = useRef<number | null>(null)
  const isWizardStep = currentStep >= COMMUNITY_STEPS_START

  useAbandonmentTracking({
    stepName: STEP_NAMES[currentStep],
    stepNumber: isWizardStep
      ? currentStep - COMMUNITY_STEPS_START + 1
      : currentStep,
    isWizard: isWizardStep,
    completedStepsCount: currentStep - 1,
  })

  useEffect(() => {
    const isWizardStep = currentStep >= COMMUNITY_STEPS_START
    const wasSignupStep = prevStepRef.current < COMMUNITY_STEPS_START
    const eventName = isWizardStep ? 'wizard_step_viewed' : 'signup_step_viewed'
    const stepNumber = isWizardStep
      ? currentStep - COMMUNITY_STEPS_START + 1
      : currentStep

    if (
      isWizardStep &&
      wasSignupStep &&
      currentStep === COMMUNITY_STEPS_START
    ) {
      const signupTime = Math.round(
        (Date.now() - (startTimeRef.current ?? Date.now())) / 1000,
      )
      trackEvent('signup_completed', {
        total_time: signupTime,
        steps_completed: 6,
      })

      wizardStartTimeRef.current = Date.now()
      trackEvent('wizard_started', {
        came_from_signup: true,
        signup_completion_time: signupTime,
        is_migration_flow: false,
      })
    }

    trackEvent(eventName, {
      step_number: stepNumber,
      step_name: STEP_NAMES[currentStep],
      time_from_start: Date.now() - (startTimeRef.current ?? Date.now()),
      ...(isWizardStep && {
        time_from_wizard_start: wizardStartTimeRef.current
          ? Date.now() - wizardStartTimeRef.current
          : 0,
      }),
    })

    prevStepRef.current = currentStep
  }, [currentStep])

  const handleBack = () => {
    if (currentStep > 1) {
      const isWizardStep = currentStep >= COMMUNITY_STEPS_START
      const eventName = isWizardStep
        ? 'wizard_back_button_clicked'
        : 'signup_back_button_clicked'
      const fromStepNumber = isWizardStep
        ? currentStep - COMMUNITY_STEPS_START + 1
        : currentStep
      const toStepNumber = isWizardStep
        ? currentStep - COMMUNITY_STEPS_START
        : currentStep - 1

      trackEvent(eventName, {
        from_step: STEP_NAMES[currentStep],
        from_step_number: fromStepNumber,
        to_step: STEP_NAMES[currentStep - 1],
        to_step_number: toStepNumber,
      })

      dispatch(onboardingGoToPrevStep())
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignupBasicInfoStep />
      case 2:
        return <SignupIndustryStep />
      case 3:
        return <SignupRoleStep />
      case 4:
        return <SignupIntegrationsStep />
      case 5:
        return <SignupEnterpriseStep />
      case 6:
        return <CommunityNameStep />
      case 7:
        return <WizardObjectivesStep />
      case 8:
        return <WizardBrandingStep />
      case 9:
        return <WizardSpacesStep />
      case 10:
        return <WizardPlanSelectionStep />
      default:
        return null
    }
  }

  const isSignupPhase = currentStep < COMMUNITY_STEPS_START
  const isCommunityPhase = currentStep >= COMMUNITY_STEPS_START
  const isPricingStep = currentStep === 10

  const renderRightSidebar = () => {
    if (isSignupPhase) {
      return <SignupSideBar />
    }

    if (isCommunityPhase && !isPricingStep) {
      return (
        <div className="bg-tertiary relative hidden h-full w-1/2 flex-col overflow-hidden lg:flex">
          <div className="flex h-full flex-col items-center justify-start p-6 lg:p-8">
            <CommunityPreview />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <PageContainer
      onBack={handleBack}
      totalSteps={currentStep < COMMUNITY_STEPS_START ? 6 : 4}
      hideBack={
        currentStep === 1 ||
        currentStep === COMMUNITY_STEPS_START ||
        isPricingStep
      }
      currentStep={
        currentStep >= COMMUNITY_STEPS_START
          ? currentStep - (COMMUNITY_STEPS_START - 1)
          : currentStep
      }
      hideSteps={isCommunityPhase}
      hideProgressBar={isCommunityPhase}
      hideHeader={false}
      hideHeaderDesktop={isPricingStep}
      contentClassName={cx(
        isSignupPhase && 'max-w-lg sm:max-w-xl md:max-w-2xl',
        isCommunityPhase && !isPricingStep && 'max-w-md sm:max-w-lg',
        isPricingStep && 'lg:px-12',
      )}
      rightSideBar={renderRightSidebar()}
    >
      <div
        // key is used to force a re-render of the component to apply the animation
        key={currentStep}
        className={cx(
          'animate-in fade-in duration-500',
          direction === 'forward'
            ? 'slide-in-from-right-4'
            : 'slide-in-from-left-4',
        )}
      >
        {renderCurrentStep()}
      </div>
    </PageContainer>
  )
}
