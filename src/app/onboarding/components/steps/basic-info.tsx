import { ArrowRight } from '@untitledui/icons'
import { useEffect, useEffectEvent, useState } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { useStepTimer } from '@/hooks/use-step-timer'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectEmail,
  onboardingSelectFirstName,
  onboardingSelectLastName,
} from '@/store/onboarding'
import { getAuthMember } from '@/app/server-actions/profile/get-auth-member'
import { getApiErrorMessage, getFieldErrors } from '@/utils/api-error'
import { updateAuthMember } from '@/app/server-actions/profile/update-auth-member'
import { brandFetchData } from '@/store/brand'
import { getEmailDomain, isWorkEmail } from '@/utils/email'
import { trackEvent } from '@/utils/segment/analytics'

export const SignupBasicInfoStep = () => {
  const storeFirstName = useAppSelector(onboardingSelectFirstName)
  const storeLastName = useAppSelector(onboardingSelectLastName)
  const [firstName, setFirstName] = useState(storeFirstName || '')
  const [lastName, setLastName] = useState(storeLastName || '')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string
    lastName?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [wasPrefilled, setWasPrefilled] = useState(false)
  const { getTimeSpent } = useStepTimer()

  const fetchInitialData = useEffectEvent(() => {
    setIsLoading(true)
    getAuthMember()
      .then(result => {
        if (result.success) {
          const [firstName, lastName] = result.data.fullName?.split(' ') || []
          setFirstName(firstName || '')
          setLastName(lastName || '')
          if (firstName || lastName) {
            setWasPrefilled(true)
          }
        } else {
          setError(result.error)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  const dispatch = useAppDispatch()

  const onFirstNameChange = (value: string) => {
    setError('')
    setFieldErrors(prev => ({ ...prev, firstName: undefined }))
    setFirstName(value)
  }

  const onLastNameChange = (value: string) => {
    setError('')
    setFieldErrors(prev => ({ ...prev, lastName: undefined }))
    setLastName(value)
  }

  const email = useAppSelector(onboardingSelectEmail)

  const onNext = () => {
    setIsLoading(true)
    setError('')
    setFieldErrors({})

    trackEvent('signup_name_entered', {
      has_first_name: !!firstName.trim(),
      has_last_name: !!lastName.trim(),
      was_prefilled: wasPrefilled,
      time_spent_on_step: getTimeSpent(),
    })

    updateAuthMember({ name: `${firstName} ${lastName}` })
      .then(async result => {
        if (result.success) {
          if (email && isWorkEmail(email)) {
            const domain = getEmailDomain(email)
            if (domain) {
              try {
                const brandResult = await dispatch(brandFetchData(domain))
                trackEvent('signup_brand_data_fetched', {
                  email_domain: domain,
                  brand_detected: !!brandResult?.company,
                  //  TODO: add company name and domain
                  // company_name: brandResult?.company?.name,
                  // company_domain: brandResult?.company?.domain,
                  logo_found: (brandResult?.logos?.length ?? 0) > 0,
                  industry_detected:
                    brandResult?.company?.industries?.[0]?.name,
                })
              } catch {
                trackEvent('signup_brand_data_fetched', {
                  email_domain: domain,
                  brand_detected: false,
                  logo_found: false,
                })
              }
            }
          }
          dispatch(onboardingAppendForm({ firstName, lastName }))
          dispatch(onboardingGoToNextStep())
        } else {
          const errors = getFieldErrors(result.error, {
            name: ['firstName', 'lastName'],
          })

          if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
          } else {
            setError(getApiErrorMessage(result.error))
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEnterToSubmit(onNext, !!firstName.trim() && !!lastName.trim())

  return (
    <StepContainer
      title="What is your name?"
      footer={
        <div className="flex lg:justify-end">
          <Button
            className="w-full lg:w-auto"
            iconTrailing={ArrowRight}
            onClick={onNext}
            size="sm"
            isDisabled={
              !firstName.trim() ||
              !lastName.trim() ||
              !!error ||
              !!fieldErrors.firstName ||
              !!fieldErrors.lastName ||
              isLoading
            }
            isLoading={isLoading}
          >
            Continue
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            label="First name"
            placeholder=""
            value={firstName}
            onChange={onFirstNameChange}
            isRequired
            isInvalid={!!fieldErrors.firstName}
            hint={fieldErrors.firstName}
            autoFocus
          />

          <Input
            label="Last name"
            placeholder=""
            value={lastName}
            onChange={onLastNameChange}
            isRequired
            isInvalid={!!fieldErrors.lastName}
            hint={fieldErrors.lastName}
          />
        </div>

        {error && (
          <p className="text-error-primary text-center text-sm">{error}</p>
        )}
      </div>
    </StepContainer>
  )
}
