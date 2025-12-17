import { ArrowRight } from '@untitledui/icons'
import { useState, useEffect, useMemo } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectCommunityName,
  onboardingSelectExistingCommunityName,
  onboardingSelectPrimaryColor,
  onboardingSetCurrentStep,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { isValidWebsiteUrl } from '../branding/utils'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { SignupStepSuccess } from './success'
import { trackEvent } from '@/utils/segment/analytics'
import { useDebounceFn } from '@/hooks/use-debounce-fn'

enum ViewStep {
  Initial = 'initial',
  CreateNew = 'create-new',
  Migrate = 'migrate',
}
export const CommunityNameStep = () => {
  const existingCommunityName =
    useAppSelector(onboardingSelectExistingCommunityName) || ''
  const communityName = useAppSelector(onboardingSelectCommunityName) || ''
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const { getTimeSpent } = useStepTimer()

  const [viewStep, setViewStep] = useState<ViewStep>(() => {
    if (existingCommunityName) return ViewStep.Migrate
    if (communityName) return ViewStep.CreateNew
    return ViewStep.Initial
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!primaryColor) {
      const defaultColor = '#6366f1'
      dispatch(onboardingAppendForm({ primaryColor: defaultColor }))
    }
  }, [primaryColor, dispatch])

  const [showEnterpriseSuccess, setShowEnterpriseSuccess] = useState(false)

  const onNext = () => {
    trackEvent('signup_community_name_submitted', {
      method: 'create_new',
      name_length: communityName.length,
      time_spent_on_step: getTimeSpent(),
    })
    trackEvent('signup_success_viewed', {
      animation_played: true,
      community_method: 'create_new',
    })
    setShowEnterpriseSuccess(true)
    setTimeout(() => {
      dispatch(onboardingGoToNextStep())
    }, 4000)
  }

  const onMigrateNext = () => {
    const urlDomain = existingCommunityName
      .replace(/^https?:\/\//, '')
      .split('/')[0]
    trackEvent('signup_migration_submitted', {
      method: 'migrate',
      source_domain: urlDomain,
      time_spent_on_step: getTimeSpent(),
      will_skip_wizard_steps: true,
    })
    dispatch(onboardingSetCurrentStep(10))
  }

  const setViewToMigrateCommunity = () => {
    trackEvent('signup_community_creation_method_selected', {
      method: 'migrate',
    })
    setViewStep(ViewStep.Migrate)
  }

  const setViewToCreateNewCommunity = () => {
    trackEvent('signup_community_creation_method_selected', {
      method: 'create_new',
    })
    setViewStep(ViewStep.CreateNew)
  }

  const debouncedTrackCommunityNameEntered = useDebounceFn((value: string) => {
    trackEvent('signup_community_name_entered', {
      name_length: value.length,
      has_special_chars: /[^a-zA-Z0-9\s]/.test(value),
    })
  }, 500)

  const onNewCommunityNameChange = (value: string) => {
    if (value && !communityName) {
      debouncedTrackCommunityNameEntered(value)
    }
    dispatch(
      onboardingAppendForm({ communityName: value, existingCommunityName: '' }),
    )
  }

  const debouncedTrackMigrationUrlEntered = useDebounceFn((value: string) => {
    const urlDomain = value.replace(/^https?:\/\//, '').split('/')[0]
    trackEvent('signup_migration_url_entered', {
      url_domain: urlDomain,
      is_valid_url: isValidWebsiteUrl(value),
    })
  }, 500)
  const onExistingCommunityNameChange = (value: string) => {
    if (value && !existingCommunityName) {
      debouncedTrackMigrationUrlEntered(value)
    }
    dispatch(
      onboardingAppendForm({ existingCommunityName: value, communityName: '' }),
    )
  }

  const isUrlValid = useMemo(() => {
    if (!existingCommunityName || !existingCommunityName.trim()) {
      return false
    }
    return isValidWebsiteUrl(existingCommunityName)
  }, [existingCommunityName])

  useEnterToSubmit(
    ViewStep.CreateNew === viewStep ? onNext : onMigrateNext,
    (ViewStep.CreateNew === viewStep && !!communityName.trim()) ||
      (ViewStep.Migrate === viewStep && isUrlValid),
  )
  return (
    <StepContainer
      title="Let's set up your community"
      description="Create a new community, but if you already have one on another platform, we can help you migrate."
      footer={
        <div
          className={cx(
            'flex-col lg:flex-row-reverse lg:pt-0',
            'flex items-center justify-between gap-3 lg:justify-start lg:gap-6',
          )}
        >
          {viewStep === ViewStep.Initial && (
            <>
              <Button
                iconTrailing={ArrowRight}
                onClick={setViewToCreateNewCommunity}
                size="sm"
                className="w-full lg:w-auto"
              >
                Create a new community
              </Button>

              <Button
                onClick={setViewToMigrateCommunity}
                className="min-h-8"
                color="link-brand"
              >
                Migrate my community
              </Button>
            </>
          )}

          {viewStep === ViewStep.Migrate && (
            <>
              <Button
                iconTrailing={ArrowRight}
                onClick={onMigrateNext}
                size="sm"
                className="w-full lg:w-auto"
                isDisabled={!existingCommunityName?.trim() || !isUrlValid}
              >
                Continue
              </Button>

              <Button
                onClick={setViewToCreateNewCommunity}
                color="link-brand"
                className="min-h-8"
              >
                Create new community instead
              </Button>
            </>
          )}

          {viewStep === ViewStep.CreateNew && (
            <>
              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                className="w-full lg:w-auto"
                isDisabled={!communityName.trim()}
              >
                Continue
              </Button>
              <Button
                onClick={setViewToMigrateCommunity}
                color="link-brand"
                className="min-h-8"
              >
                Migrate my community
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="flex flex-col flex-wrap gap-6">
        {viewStep === ViewStep.Migrate && (
          <div className="flex flex-col gap-6">
            <div>
              <Input
                label="Current community URL"
                type="url"
                placeholder="e.g., https://mycommunity.com"
                value={existingCommunityName}
                onChange={onExistingCommunityNameChange}
                hint={
                  existingCommunityName && !isUrlValid
                    ? 'Please enter a valid URL (e.g., https://mycommunity.com)'
                    : 'Enter the URL of your existing community that you want to migrate.'
                }
                isRequired
                isInvalid={existingCommunityName ? !isUrlValid : false}
              />
            </div>
          </div>
        )}

        {viewStep === ViewStep.CreateNew && (
          <div className="flex flex-col gap-6">
            <div>
              <Input
                label="Community name"
                type="text"
                placeholder="e.g., Acme Community"
                value={communityName}
                onChange={onNewCommunityNameChange}
                hint={"We'll use this name across your workspace and emails."}
                isRequired
                isInvalid={false}
              />
            </div>
          </div>
        )}

        {showEnterpriseSuccess && <SignupStepSuccess />}
      </div>
    </StepContainer>
  )
}
