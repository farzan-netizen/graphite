import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectObjectives,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { Check } from '@untitledui/icons'
import { useEffect, useState } from 'react'
import { Tooltip, TooltipTrigger } from '@/components/base/tooltip/tooltip'
import { OBJECTIVE_OPTIONS } from './constants'
import { trackEvent } from '@/utils/segment/analytics'

export const WizardObjectivesStep = () => {
  const storeObjectives = useAppSelector(onboardingSelectObjectives)
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(
    storeObjectives || [],
  )
  const dispatch = useAppDispatch()
  const { getTimeSpent } = useStepTimer()

  useEffect(() => {
    trackEvent('wizard_objectives_viewed', {
      total_objectives_available: OBJECTIVE_OPTIONS.length,
    })
  }, [])

  const onNext = () => {
    trackEvent('wizard_objectives_submitted', {
      selected_objectives: selectedObjectives,
      objectives_count: selectedObjectives.length,
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(onboardingAppendForm({ objectives: selectedObjectives }))
    dispatch(onboardingGoToNextStep())
  }

  const handleToggle = (id: string) => {
    setSelectedObjectives(prev => {
      const objective = OBJECTIVE_OPTIONS.find(o => o.id === id)
      const isCurrentlySelected = prev.includes(id)

      if (isCurrentlySelected) {
        trackEvent('wizard_objective_deselected', {
          objective_id: id,
          objective_name: objective?.title,
          total_selected: prev.length - 1,
        })
      } else {
        trackEvent('wizard_objective_selected', {
          objective_id: id,
          objective_name: objective?.title,
          total_selected: prev.length + 1,
        })
      }

      if (isCurrentlySelected) {
        return prev.filter(objectiveId => objectiveId !== id)
      }
      return [...prev, id]
    })
  }

  useEnterToSubmit(onNext, selectedObjectives.length > 0)

  return (
    <StepContainer
      title="What about use cases and objectives to better clarify our ICP?"
      description="Select the objectives that align with your community goals. Choose as many as you'd like."
      footer={
        <div className="justify-end lg:flex lg:pt-4">
          <Button
            onClick={onNext}
            size="sm"
            isDisabled={selectedObjectives.length === 0}
            className="w-full lg:w-auto"
          >
            Continue
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        {OBJECTIVE_OPTIONS.map(objective => {
          const isSelected = selectedObjectives.includes(objective.id)
          const Icon = objective.icon
          return (
            <Tooltip
              key={objective.id}
              title={objective.description}
              placement="top"
              delay={200}
              onOpenChange={open => {
                if (open) {
                  trackEvent('wizard_objective_tooltip_viewed', {
                    objective_id: objective.id,
                    objective_name: objective.title,
                  })
                }
              }}
            >
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleToggle(objective.id)}
                  className={cx(
                    'flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:shadow-sm',
                    isSelected
                      ? 'border-brand-400 selected-item-bg shadow-sm'
                      : 'border-secondary hover:border-primary',
                  )}
                >
                  <Icon className="text-brand-secondary h-5 w-5" />
                  <h3 className="text-primary flex-1 text-sm font-semibold">
                    {objective.title}
                  </h3>
                  {isSelected && (
                    <Check className="h-4 w-4" style={{ color: '#0AC06C' }} />
                  )}
                </button>
              </TooltipTrigger>
            </Tooltip>
          )
        })}
      </div>
    </StepContainer>
  )
}
