import {
  useState,
  useTransition,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  type RefCallback,
  useEffectEvent,
} from 'react'
import type { ReactNode } from 'react'
import { StepContainer } from '@/app/components/step-container'
import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { useStepTimer } from '@/hooks/use-step-timer'
import { brandSelectState } from '@/store/brand'
import {
  onboardingSelectForm,
  onboardingSelectEnterpriseFeatures,
  onboardingSelectBillingPeriod,
  onboardingAppendForm,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { completeOnboarding } from '@/app/server-actions/onboarding/complete-onboarding'
import { RoutePaths } from '@/constants/routes'
import { useRouter } from '@/hooks/use-router'
import { appAddToastMessage, appSelectIsMobile } from '@/store/app'
import { getApiErrorMessage } from '@/utils/api-error'
import { getRecommendedPlan, getPlansOptions } from './utils'
import type { Plan, PlanId, CtaMode } from './types'
import { DesktopLayout } from './components/desktop-layout'
import { DesktopPlanContent } from './components/desktop-plan-content'
import { LoadingOverlay } from './components/loading-overlay'
import { MobileLayout } from './components/mobile-layout'
import { MobilePlanContent } from './components/mobile-plan-content'
import { RecommendedBadge } from './components/recommended-badge'
import { TrialSuccess } from './components/trial-success'
import { WaitListSuccess } from './components/waitlist-success'
import { trackEvent } from '@/utils/segment/analytics'

interface WizardPlanSelectionStepProps {
  excludeGrowth?: boolean
  ctaMode?: CtaMode
}

export const WizardPlanSelectionStep = ({
  excludeGrowth = true,
  ctaMode = 'waitlist',
}: WizardPlanSelectionStepProps = {}) => {
  const formData = useAppSelector(onboardingSelectForm)
  const enterpriseFeatures = useAppSelector(onboardingSelectEnterpriseFeatures)
  const isMobile = useAppSelector(appSelectIsMobile)
  const brandData = useAppSelector(brandSelectState)
  const billingPeriod =
    useAppSelector(onboardingSelectBillingPeriod) || 'annual'
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { getTimeSpent } = useStepTimer()
  const cardExpandTimes = useRef<Record<string, number>>({})
  const viewedCards = useRef<Set<string>>(new Set())

  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [showTrialSuccess, setShowTrialSuccess] = useState(false)
  const [showWaitListSuccess, setShowWaitListSuccess] = useState(false)

  const formDataWithEnterpriseFeatures =
    enterpriseFeatures && enterpriseFeatures.length > 0
      ? { ...formData, enterpriseFeatures }
      : formData

  const recommendedPlanType = getRecommendedPlan(
    formDataWithEnterpriseFeatures,
    excludeGrowth,
  )

  const filteredPlans = useMemo(
    () => getPlansOptions({ excludeGrowth, ctaMode }),
    [excludeGrowth, ctaMode],
  )
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    recommendedPlanType as PlanId,
  )

  const trackPlanSelectionViewed = useEffectEvent(() => {
    trackEvent('wizard_plan_selection_viewed', {
      recommended_plan: recommendedPlanType,
      recommendation_factors: {
        role: formData?.role,
        industry: formData?.industry,
        objectives_count: formData?.objectives?.length ?? 0,
        integrations_count: formData?.integrations?.length ?? 0,
        has_growth_enterprise_integrations:
          (formData?.integrations?.length ?? 0) > 6,
        has_enterprise_features: (enterpriseFeatures?.length ?? 0) > 0,
        is_migration: !!formData?.existingCommunityName,
      },
      plan_version: ctaMode === 'waitlist' ? 'softlaunch' : 'main',
      personalized_message_shown: true,
    })
  })
  useEffect(() => {
    trackPlanSelectionViewed()
  }, [])

  const toggleCard = useCallback(
    (planId: string) => {
      if (!isMobile) return
      const plan = filteredPlans.find(p => p.id === planId)
      const isExpanding = !expandedCards.has(planId)
      const now = Date.now()

      if (isExpanding) {
        cardExpandTimes.current[planId] = now
        trackEvent('wizard_plan_card_expanded', {
          plan_id: planId,
          plan_name: plan?.name,
          is_recommended: planId === recommendedPlanType,
        })
      } else {
        const expandTime = cardExpandTimes.current[planId]
        trackEvent('wizard_plan_card_collapsed', {
          plan_id: planId,
          plan_name: plan?.name,
          time_expanded: expandTime ? Math.round((now - expandTime) / 1000) : 0,
        })
      }

      setExpandedCards(prev => {
        const newSet = new Set(prev)
        if (newSet.has(planId)) {
          newSet.delete(planId)
        } else {
          newSet.add(planId)
        }
        return newSet
      })
    },
    [isMobile, filteredPlans, expandedCards, recommendedPlanType],
  )

  const createCardRef = useCallback(
    (plan: Plan): RefCallback<HTMLDivElement> => {
      return (node: HTMLDivElement | null) => {
        if (!node || viewedCards.current.has(plan.id)) return

        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !viewedCards.current.has(plan.id)) {
                viewedCards.current.add(plan.id)
                trackEvent('wizard_plan_card_viewed', {
                  plan_id: plan.id,
                  plan_name: plan.name,
                  is_recommended: plan.id === recommendedPlanType,
                  billing_period: billingPeriod,
                  price_shown:
                    billingPeriod === 'annual' ? plan.annualPrice : plan.price,
                  plan_version: ctaMode === 'waitlist' ? 'softlaunch' : 'main',
                })
                observer.disconnect()
              }
            })
          },
          { threshold: 0.5 },
        )

        observer.observe(node)
      }
    },
    [recommendedPlanType, billingPeriod, ctaMode],
  )

  const onSubmit = async (plan: PlanId) => {
    if (isLoading) return
    setSelectedPlan(plan)
    setIsLoading(true)

    const planDetails = filteredPlans.find(p => p.id === plan)

    trackEvent('wizard_plan_selected', {
      selected_plan: plan,
      plan_name: planDetails?.name,
      billing_period: billingPeriod,
      is_recommended_plan: plan === recommendedPlanType,
      cta_type: ctaMode === 'waitlist' ? 'waitlist' : 'trial',
      plan_version: ctaMode === 'waitlist' ? 'softlaunch' : 'main',
      time_spent_on_step: getTimeSpent(),
    })

    trackEvent('wizard_onboarding_api_started', {
      selected_plan: plan,
      billing_period: billingPeriod,
    })

    const apiStartTime = Date.now()
    const result = await completeOnboarding()

    trackEvent('wizard_onboarding_api_completed', {
      success: result.success,
      error_message: result.success
        ? undefined
        : getApiErrorMessage(result.error),
      api_response_time: Date.now() - apiStartTime,
    })

    if (result.success) {
      if (ctaMode === 'waitlist') {
        setShowWaitListSuccess(true)
      } else {
        setShowTrialSuccess(true)
        trackEvent('wizard_trial_success_viewed', {
          selected_plan: plan,
          animation_played: true,
          plan_version: 'main',
        })
      }
      setTimeout(() => {
        dispatch(onboardingAppendForm({ selectedPlan: plan }))

        trackEvent('wizard_completed', {
          total_wizard_time: getTimeSpent(),
          selected_plan: plan,
          community_name: formData?.communityName,
          objectives_count: formData?.objectives?.length ?? 0,
          has_logo: !!formData?.logoUrl,
          logo_source: formData?.logoUrl ? 'brandfetch' : 'no_logo',
          primary_color: formData?.primaryColor,
          spaces_count: formData?.spaces?.length ?? 0,
          billing_period: billingPeriod,
          was_migration: !!formData?.existingCommunityName,
          used_brandfetch: !!brandData?.company,
          plan_version: ctaMode === 'waitlist' ? 'softlaunch' : 'main',
          redirect_to: RoutePaths.HOME,
        })

        setIsNavigating(true)
        startTransition(() => {
          router.push(RoutePaths.HOME)
        })
      }, 3000)
    } else {
      const errorMessage = getApiErrorMessage(result.error)
      trackEvent('wizard_error_occurred', {
        error_type: 'api',
        error_message: errorMessage || 'Failed to complete onboarding',
        step_name: 'plan_selection',
        step_number: 4,
      })
      dispatch(
        appAddToastMessage({
          message:
            errorMessage || 'Failed to complete onboarding. Please try again.',
          type: 'error',
        }),
      )
    }
    setIsLoading(false)
  }

  const onAnnualClick = () => {
    trackEvent('wizard_billing_period_toggled', {
      new_period: 'annual',
      previous_period: billingPeriod,
    })
    dispatch(onboardingAppendForm({ billingPeriod: 'annual' }))
  }
  const onMonthlyClick = () => {
    trackEvent('wizard_billing_period_toggled', {
      new_period: 'monthly',
      previous_period: billingPeriod,
    })
    dispatch(onboardingAppendForm({ billingPeriod: 'monthly' }))
  }

  const renderPlanCard = (plan: Plan, index: number): ReactNode => {
    const isExpanded = expandedCards.has(plan.id)
    const isRecommended = plan.id === recommendedPlanType
    const isDisabled = plan.id === 'enterprise' && billingPeriod === 'monthly'

    return (
      <div
        key={plan.id}
        ref={createCardRef(plan)}
        onClick={() => toggleCard(plan.id)}
        className={cx(
          'relative flex flex-col border sm:rounded-xl sm:p-4',
          'transition-[padding] duration-300 ease-in-out',
          'rounded-lg px-3 pt-1 pb-3',
          isRecommended ? 'recommended-plan-gradient' : 'border-secondary',
          !isMobile && 'min-h-[350px] sm:min-h-[400px]',
          isDisabled && 'pointer-events-none opacity-20',
          index === 0 &&
            "xl:after:bg-secondary/30 xl:after:absolute xl:after:top-0 xl:after:-right-2 xl:after:bottom-0 xl:after:w-px xl:after:content-['']",
          isMobile && 'cursor-pointer',
          isMobile && !isExpanded && 'hover:border-tertiary/50',
        )}
      >
        {isRecommended && !isMobile && <RecommendedBadge />}

        {isMobile ? (
          <MobilePlanContent
            hasGrowthPlan={!excludeGrowth}
            plan={plan}
            isExpanded={isExpanded}
            isRecommended={isRecommended}
            billingPeriod={billingPeriod}
            isLoading={isLoading}
            selectedPlan={selectedPlan}
            onSubmit={onSubmit}
            isMigrationUser={!!formData?.existingCommunityName}
          />
        ) : (
          <DesktopPlanContent
            hasGrowthPlan={!excludeGrowth}
            plan={plan}
            isRecommended={isRecommended}
            billingPeriod={billingPeriod}
            isLoading={isLoading}
            selectedPlan={selectedPlan}
            onSubmit={onSubmit}
            isMigrationUser={!!formData?.existingCommunityName}
          />
        )}
      </div>
    )
  }

  return (
    <>
      <LoadingOverlay isVisible={isPending || isNavigating} />

      <StepContainer>
        {isMobile && formDataWithEnterpriseFeatures ? (
          <MobileLayout
            formData={formDataWithEnterpriseFeatures}
            recommendedPlanType={recommendedPlanType}
            brandData={brandData}
            billingPeriod={billingPeriod}
            plans={filteredPlans}
            onAnnualClick={onAnnualClick}
            onMonthlyClick={onMonthlyClick}
            renderPlanCard={renderPlanCard}
          />
        ) : (
          <DesktopLayout
            formData={formDataWithEnterpriseFeatures}
            recommendedPlanType={recommendedPlanType}
            brandData={brandData}
            billingPeriod={billingPeriod}
            isMobile={isMobile}
            plans={filteredPlans}
            onAnnualClick={onAnnualClick}
            onMonthlyClick={onMonthlyClick}
            renderPlanCard={renderPlanCard}
          />
        )}

        {showTrialSuccess && <TrialSuccess />}
        {showWaitListSuccess && <WaitListSuccess />}
      </StepContainer>
    </>
  )
}
