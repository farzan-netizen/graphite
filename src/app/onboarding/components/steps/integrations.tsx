import { ArrowRight, InfoCircle } from '@untitledui/icons'
import { useEffect, useMemo, useState } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { Image } from '@/components/base/image'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectIntegrations,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { trackEvent } from '@/utils/segment/analytics'

import { SAAS_TOOLS_ITEMS, type SaasToolId } from '../constants'

export const SignupIntegrationsStep = () => {
  const storeIntegrations = useAppSelector(onboardingSelectIntegrations)
  const [selectedIntegrations, setSelectedIntegrations] = useState(
    (storeIntegrations || []) as SaasToolId[],
  )
  const { getTimeSpent } = useStepTimer()

  const dispatch = useAppDispatch()

  useEffect(() => {
    trackEvent('signup_integrations_viewed', {
      total_integrations_available: SAAS_TOOLS_ITEMS.length,
    })
  }, [])

  const onNext = () => {
    const enterpriseIntegrations = selectedIntegrations.filter(id => {
      const tool = SAAS_TOOLS_ITEMS.find(t => t.id === id)
      return tool?.isEnterprise
    })

    trackEvent('signup_integrations_submitted', {
      selected_integrations: selectedIntegrations,
      integrations_count: selectedIntegrations.length,
      has_growth_enterprise_integrations: enterpriseIntegrations.length > 0,
      starter_integrations_count:
        selectedIntegrations.length - enterpriseIntegrations.length,
      growth_enterprise_integrations_count: enterpriseIntegrations.length,
      time_spent_on_step: getTimeSpent(),
    })

    dispatch(onboardingAppendForm({ integrations: selectedIntegrations }))
    dispatch(onboardingGoToNextStep())
  }

  const onSkip = () => {
    trackEvent('signup_integrations_skipped', {
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(onboardingAppendForm({ integrations: [] }))
    dispatch(onboardingGoToNextStep())
  }

  const onItemClick = (selectedId: SaasToolId) => {
    setSelectedIntegrations(prev => {
      const tool = SAAS_TOOLS_ITEMS.find(t => t.id === selectedId)
      const isCurrentlySelected = prev.includes(selectedId)

      if (isCurrentlySelected) {
        trackEvent('signup_integration_deselected', {
          integration_id: selectedId,
          integration_name: tool?.name,
          total_selected: prev.length - 1,
        })
      } else {
        trackEvent('signup_integration_selected', {
          integration_id: selectedId,
          integration_name: tool?.name,
          is_growth_enterprise_only: tool?.isEnterprise ?? false,
          plan_tier: tool?.isEnterprise ? 'growth_enterprise' : 'starter',
          total_selected: prev.length + 1,
        })
      }

      if (isCurrentlySelected) {
        return prev.filter(id => selectedId !== id)
      }
      return [...prev, selectedId]
    })
  }

  const hasSelectedAll = useMemo(
    () =>
      SAAS_TOOLS_ITEMS.every(tool => selectedIntegrations.includes(tool.id)),
    [selectedIntegrations],
  )

  const onSelectAll = () => {
    trackEvent('signup_integrations_select_all_clicked', {
      action: hasSelectedAll ? 'unselect_all' : 'select_all',
      total_integrations: SAAS_TOOLS_ITEMS.length,
    })
    if (hasSelectedAll) setSelectedIntegrations([])
    else setSelectedIntegrations(SAAS_TOOLS_ITEMS.map(i => i.id))
  }

  useEnterToSubmit(onNext, selectedIntegrations.length > 0)

  return (
    <StepContainer
      title="Communities are much more powerful with awesome integrations"
      description="Choose as many as you want. It helps us guide you to the right plan."
      footer={
        <div>
          <div className="pb-3">
            <div className="rounded-lg pb-0 lg:pb-4">
              <p className="text-tertiary text-center text-xs lg:text-left">
                <InfoCircle className="text-brand-asterisk mr-1 inline h-3 w-3" />
                These integrations are only available in the Enterprise plan.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row-reverse lg:justify-start lg:gap-6">
            <Button
              iconTrailing={ArrowRight}
              onClick={onNext}
              size="sm"
              className="w-full lg:w-auto"
              isDisabled={selectedIntegrations.length === 0}
            >
              Continue
            </Button>
            <Button
              onClick={onSkip}
              color="link-brand"
              className="min-w-0 whitespace-normal!"
            >
              No integrations needed for now
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Button onClick={onSelectAll} color="link-gray">
              {hasSelectedAll ? 'Unselect all' : 'Select all'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SAAS_TOOLS_ITEMS.map(tool => (
              <div
                key={tool.id}
                className={cx(
                  'flex w-fit cursor-pointer items-center rounded-full border transition-all hover:shadow-sm',
                  'px-2 py-1.5 sm:px-3 sm:py-2',
                  selectedIntegrations.includes(tool.id)
                    ? 'border-brand-400 selected-item-bg shadow-sm'
                    : 'border-secondary hover:border-primary',
                )}
                onClick={() => onItemClick(tool.id)}
              >
                {tool.logo && (
                  <div className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full sm:mr-2">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      className={cx(
                        'h-full w-full object-contain',
                        tool.id === 'custom-code' && 'logo-filter',
                      )}
                      width={20}
                      height={20}
                    />
                  </div>
                )}

                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="text-primary text-xs font-medium whitespace-nowrap sm:text-sm">
                    {tool.name}
                  </div>
                  {tool.isEnterprise && (
                    <InfoCircle className="text-brand-asterisk h-3 w-3" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepContainer>
  )
}
