import { ArrowRight } from '@untitledui/icons'
import { useEffect, useMemo, useState } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectEnterpriseFeatures,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { trackEvent } from '@/utils/segment/analytics'

import {
  ENTERPRISE_FEATURES_ITEMS,
  type EnterpriseFeatureId,
} from './constants'
import { appSelectIsMobile } from '@/store/app'

export const SignupEnterpriseStep = () => {
  const isMobile = useAppSelector(appSelectIsMobile)
  const storeEnterpriseFeatures = useAppSelector(
    onboardingSelectEnterpriseFeatures,
  )
  const [selectedEnterpriseFeatures, setSelectedEnterpriseFeatures] = useState(
    storeEnterpriseFeatures || [],
  )
  const { getTimeSpent } = useStepTimer()

  useEffect(() => {
    trackEvent('signup_enterprise_question_viewed', { step_number: 5 })
  }, [])

  const hasSelectedAll = useMemo(
    () =>
      ENTERPRISE_FEATURES_ITEMS.every(({ id }) =>
        selectedEnterpriseFeatures.includes(id),
      ),
    [selectedEnterpriseFeatures],
  )

  const dispatch = useAppDispatch()

  const onNext = () => {
    trackEvent('signup_enterprise_features_submitted', {
      selected_features: selectedEnterpriseFeatures,
      features_count: selectedEnterpriseFeatures.length,
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(
      onboardingAppendForm({ enterpriseFeatures: selectedEnterpriseFeatures }),
    )
    dispatch(onboardingGoToNextStep())
  }

  const onSkip = () => {
    trackEvent('signup_enterprise_question_no_clicked', {
      time_spent_on_question: getTimeSpent(),
    })
    dispatch(onboardingAppendForm({ enterpriseFeatures: [] }))
    dispatch(onboardingGoToNextStep())
  }

  const onSelectAll = () => {
    trackEvent('signup_enterprise_features_select_all_clicked', {
      action: hasSelectedAll ? 'unselect_all' : 'select_all',
      total_features: ENTERPRISE_FEATURES_ITEMS.length,
    })
    if (hasSelectedAll) {
      setSelectedEnterpriseFeatures([])
    } else {
      setSelectedEnterpriseFeatures(
        ENTERPRISE_FEATURES_ITEMS.map(({ id }) => id),
      )
    }
  }

  const onItemClick = (selectedId: EnterpriseFeatureId) => () => {
    setSelectedEnterpriseFeatures(prev => {
      const feature = ENTERPRISE_FEATURES_ITEMS.find(f => f.id === selectedId)
      const isCurrentlySelected = prev.includes(selectedId)

      if (isCurrentlySelected) {
        trackEvent('signup_enterprise_feature_deselected', {
          feature_id: selectedId,
          feature_name: feature?.name,
          total_selected: prev.length - 1,
        })
      } else {
        trackEvent('signup_enterprise_feature_selected', {
          feature_id: selectedId,
          feature_name: feature?.name,
          total_selected: prev.length + 1,
        })
      }

      if (isCurrentlySelected) {
        return prev.filter(id => id !== selectedId)
      }
      return [...prev, selectedId]
    })
  }

  const [showOptions, setShowOptions] = useState(
    selectedEnterpriseFeatures.length > 0,
  )
  const showOptionsOnClick = () => {
    trackEvent('signup_enterprise_features_opened')
    setShowOptions(true)
  }

  useEnterToSubmit(() => {
    if (!showOptions) {
      showOptionsOnClick()
    } else if (selectedEnterpriseFeatures.length > 0) {
      onNext()
    } else {
      onSkip()
    }
  }, true)

  return (
    <StepContainer
      title="Looking for enterprise‑grade control and support?"
      description="Get advanced security, enterprise controls, and a dedicated CSM. We'll tailor your plan in a quick call with our sales team."
      footer={
        <div className="flex flex-col items-center justify-between gap-3 lg:flex-row-reverse lg:justify-start lg:gap-6">
          {showOptions ? (
            <>
              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                isDisabled={selectedEnterpriseFeatures.length === 0}
                className="w-full lg:w-auto"
                disableTransition={selectedEnterpriseFeatures.length === 0}
              >
                Continue
              </Button>
              <Button onClick={onSkip} color="link-brand" className="min-h-8">
                Continue without enterprise features
              </Button>
            </>
          ) : (
            <>
              <Button
                iconTrailing={ArrowRight}
                onClick={showOptionsOnClick}
                size="sm"
                className="w-full lg:w-auto"
              >
                Yes
              </Button>
              <Button onClick={onSkip} color="link-brand" className="min-h-8">
                No, Continue without enterprise features
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {showOptions && (
          <div
            className="mt-4 flex flex-col gap-6"
            style={{
              animation: 'fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="flex justify-end">
              <Button onClick={onSelectAll} color="link-gray">
                {hasSelectedAll ? 'Unselect all' : 'Select all'}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {ENTERPRISE_FEATURES_ITEMS.map((feature, index) => {
                // Reduce delay and duration on mobile to prevent hang
                const delay = isMobile
                  ? Math.min(index * 20, 100) // Max 100ms delay on mobile, smaller increments
                  : index * 50
                const duration = isMobile ? 400 : 600 // Shorter duration on mobile

                return (
                  <button
                    key={feature.id}
                    onClick={onItemClick(feature.id)}
                    className={cx(
                      'rounded-lg border p-3 text-left transition-all hover:shadow-sm sm:p-4',
                      selectedEnterpriseFeatures.includes(feature.id)
                        ? 'border-brand-400 selected-item-bg shadow-sm'
                        : 'border-secondary hover:border-primary',
                    )}
                    style={{
                      animation: `fadeInUp ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
                      animationFillMode: 'both',
                      willChange: isMobile ? 'auto' : 'transform, opacity', // Disable will-change on mobile to reduce overhead
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 h-5 w-5"
                        style={{ color: '#0AC06C' }}
                      >
                        <feature.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-primary mb-1 truncate text-xs font-medium sm:text-sm">
                          {feature.name}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </StepContainer>
  )
}
