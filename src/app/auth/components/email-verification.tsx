import { ArrowRight } from '@untitledui/icons'
import { useCallback, useEffect, useRef, useState } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { OTPInput } from '@/components/base/otp-input'
import { useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { onboardingSelectEmail } from '@/store/onboarding'
import { useRouter } from '@/hooks/use-router'
import { validateGlobalTokenCode } from '@/app/server-actions/auth/validate-global-token-code'
import { useRedirect } from '@/hooks/use-redirect'
import { Errors } from '@/constants/errors'
import { resendGlobalTokenCode } from '@/app/server-actions/auth/resend-global-token-code'
import { useGetRecaptchaToken } from './use-get-recaptcha-token'
import { getApiErrorMessage } from '@/utils/api-error'
import { useSearchParams } from '@/hooks/use-search-params'
import { SearchParams } from '@/constants/search-params'
import { trackEvent } from '@/utils/segment/analytics'
import { getEmailDomain } from '@/utils/email'

interface AuthEmailVerificationProps {
  onBack: () => void
}

const VERIFICATION_CODE_LENGTH = 6
export const AuthEmailVerification = ({
  onBack,
}: AuthEmailVerificationProps) => {
  const emailParam = useSearchParams().get(SearchParams.Email)
  const email = useAppSelector(onboardingSelectEmail) ?? emailParam ?? ''
  const [error, setError] = useState('')
  const codeParam = useSearchParams().get(SearchParams.VerificationCode)
  const [verificationCode, setVerificationCode] = useState(codeParam || '')
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const attemptsCount = useRef(0)

  const redirectURL = useRedirect()

  const onChangeOTP = (updatedCode: string) => {
    setError('')
    setVerificationCode(updatedCode)
  }

  const trackError = (
    errorType: string,
    errorMessage: string,
    fieldName?: string,
  ) => {
    trackEvent('signup_error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      step_name: 'otp_verification',
      step_number: 0,
      field_name: fieldName,
    })
  }

  const onNext = useCallback(() => {
    setIsLoading(true)
    attemptsCount.current += 1

    validateGlobalTokenCode({ email, verificationCode })
      .then(result => {
        trackEvent('signup_otp_entered', {
          is_valid: result.success,
          attempts_count: attemptsCount.current,
          auth_method: 'email',
        })
        if (result.success) {
          router.replace(redirectURL)
        } else {
          trackError('validation', result.error, 'verification_code')
          setError(result.error)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [email, verificationCode, router, redirectURL])

  const { getRecaptchaToken } = useGetRecaptchaToken()

  const [isResending, setIsResending] = useState(false)
  const onResendCode = async () => {
    try {
      setIsResending(true)
      const captchaToken = await getRecaptchaToken()
      trackEvent('signup_otp_resend_requested', {
        email_domain: getEmailDomain(email),
        auth_method: 'email',
        otp_delivery_method: 'email',
      })
      const result = await resendGlobalTokenCode({ email, captchaToken })
      if (!result.success) {
        setError(result.error)
        return
      }
      if (!result.data.success) {
        setError(Errors.SOMETHING_WENT_WRONG)
        return
      }
      setResendTimer(30)
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      const errorMsg = getApiErrorMessage(error)
      trackError('api', errorMsg)
      setError(errorMsg)
    } finally {
      setIsResending(false)
    }
  }

  useEnterToSubmit(
    onNext,
    verificationCode.length === VERIFICATION_CODE_LENGTH && !error,
  )

  // If the user has filled in all digits, submit the form
  useEffect(() => {
    if (
      email &&
      verificationCode?.length === VERIFICATION_CODE_LENGTH &&
      !error
    ) {
      onNext()
    }
  }, [email, verificationCode, error, onNext])

  return (
    <StepContainer
      title="Check your email for a code"
      description={`We've sent a 6-character code to ${email}. The code expires shortly, so please enter it soon.`}
    >
      <div className="flex flex-col gap-6">
        <div className="mx-auto">
          <OTPInput
            value={verificationCode}
            numInputs={VERIFICATION_CODE_LENGTH}
            onChange={onChangeOTP}
            shouldAutoFocus
          />
        </div>

        {error && (
          <p className="text-error-primary text-center text-sm">
            {error === 'Code has been expired, tap to resend' ? (
              <>
                Code has been expired, tap to{' '}
                <Button
                  onClick={onResendCode}
                  isLoading={isResending}
                  color="link-gray"
                  isDisabled={resendTimer > 0}
                >
                  <span className="text-primary cursor-pointer font-medium underline hover:no-underline">
                    {resendTimer > 0 ? (
                      <span className="inline-block min-w-[90px] text-left">
                        {`resend in ${resendTimer}s`}
                      </span>
                    ) : (
                      'resend'
                    )}
                  </span>
                </Button>
              </>
            ) : error === 'Code has been sent' ? (
              <span className="text-green-600">Code has been sent</span>
            ) : (
              error
            )}
          </p>
        )}

        <Button
          className="w-full"
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="md"
          isDisabled={verificationCode.length !== 6 || !!error}
          isLoading={isLoading}
        >
          Next
        </Button>

        <div className="flex flex-col gap-3 text-center">
          <div className="text-tertiary text-sm">
            {`Didn't get the email? `}
            {resendTimer > 0 ? (
              <span className="text-quaternary inline-block min-w-[90px] text-left">
                Resend in {resendTimer}s
              </span>
            ) : (
              <Button
                color="link-brand"
                onClick={onResendCode}
                isLoading={isResending}
              >
                Resend
              </Button>
            )}{' '}
            or{' '}
            <Button onClick={onBack} color="link-brand">
              edit your email address
            </Button>
          </div>

          <p className="text-tertiary text-sm">
            {`Can't find your code? Check your spam folder!`}
          </p>
        </div>
      </div>
    </StepContainer>
  )
}
