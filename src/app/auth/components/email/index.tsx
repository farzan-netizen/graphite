import { ArrowRight } from '@untitledui/icons'
import { useState } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { onboardingAppendForm, onboardingSelectEmail } from '@/store/onboarding'
import { GoogleIcon } from './google-icon'
import { useRouter } from '@/hooks/use-router'
import { RoutePaths } from '@/constants/routes'
import { getEmailDomain, isValidEmail, isWorkEmail } from '@/utils/email'
import { validateEmail } from '@/app/server-actions/auth/validate-email'
import { requestGlobalTokenCode } from '@/app/server-actions/auth/request-global-token-code'
import { useGetRecaptchaToken } from '../use-get-recaptcha-token'
import { useAuthPageParams } from '../use-auth-page-params'
import { loginWithSso } from '@/app/server-actions/auth/login-with-sso'
import { SearchParams } from '@/constants/search-params'
import { useSearchParams } from '@/hooks/use-search-params'
import { trackEvent } from '@/utils/segment/analytics'

const DEFAULT_ERROR_MESSAGE = 'Your email is not valid.'
export const AuthEmailStep = () => {
  const storeEmail = useAppSelector(onboardingSelectEmail)
  const [email, setEmail] = useState(storeEmail || '')
  const messageParam = useSearchParams().get(SearchParams.Message)
  const [error, setError] = useState(messageParam || '')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [ssoIsLoading, setSsoIsLoading] = useState(false)

  const { googleSsoParams, redirectParams } = useAuthPageParams()
  const onGoogleAuth = async () => {
    trackEvent('signup_google_auth_clicked', { auth_method: 'google' })
    setSsoIsLoading(true)
    const result = await loginWithSso({
      provider: googleSsoParams.provider,
      redirectUri: googleSsoParams.redirect_uri,
      referrer: googleSsoParams.referrer,
      referrerUri: googleSsoParams.referrer_uri,
    })
    if (result && !result.success) {
      trackError('api', result.error)
      setError(result.error)
    }
    setSsoIsLoading(false)
  }

  const onChange = (value: string) => {
    setError('')
    setEmail(value)
  }
  const { getRecaptchaToken } = useGetRecaptchaToken()

  const trackError = (
    errorType: string,
    errorMessage: string,
    fieldName?: string,
  ) => {
    trackEvent('signup_error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      step_name: 'authentication',
      step_number: 0,
      field_name: fieldName,
    })
  }

  const submitForm = async () => {
    const emailDomain = getEmailDomain(email)
    trackEvent('signup_email_entered', {
      email_domain: emailDomain,
      is_work_email: isWorkEmail(email),
      auth_method: 'email',
      // TODO: add is_existing_user logic
      // is_existing_user:
    })

    if (!isValidEmail(email)) {
      trackError('validation', DEFAULT_ERROR_MESSAGE, 'email')
      setError(DEFAULT_ERROR_MESSAGE)
      return
    }

    if (!isWorkEmail(email)) {
      const errorMsg =
        'Only work emails are acceptable. Please use your company email address.'
      trackError('validation', errorMsg, 'email')
      setError(errorMsg)
      return
    }

    const validateEmailCaptchaToken = await getRecaptchaToken()
    const emailResult = await validateEmail({
      email,
      captchaToken: validateEmailCaptchaToken,
    })

    if (!emailResult.success) {
      trackError('api', emailResult.error, 'email')
      setError(emailResult.error)
      return
    }

    if (!emailResult.data.valid) {
      const errorMsg = emailResult.data.suggestion || DEFAULT_ERROR_MESSAGE
      trackError('validation', errorMsg, 'email')
      setError(errorMsg)
      return
    }

    trackEvent('signup_otp_requested', {
      email_domain: emailDomain,
      auth_method: 'email',
      otp_delivery_method: 'email',
    })

    // Get a new captcha token validating email
    // Should not be the same token as the one used for previous request

    const requestGlobalTokenCodeCaptchaToken = await getRecaptchaToken()
    const requestResult = await requestGlobalTokenCode({
      email,
      captchaToken: requestGlobalTokenCodeCaptchaToken,
    })

    if (!requestResult.success) {
      trackError('api', requestResult.error)
      setError(requestResult.error)
      return
    }

    dispatch(onboardingAppendForm({ email }))
    const verifyParams = new URLSearchParams(redirectParams)
    verifyParams.set('email', email)
    const url = `${RoutePaths.VERIFY}?${verifyParams.toString()}`
    router.push(url)
  }

  const handleOnNext = async () => {
    setIsLoading(true)
    submitForm().finally(() => {
      setIsLoading(false)
    })
  }

  useEnterToSubmit(handleOnNext, !!email?.trim() && !error && !isLoading)

  return (
    <StepContainer
      title="First, enter your email"
      description="We need to use the email address you use at work."
    >
      <div className="flex flex-col gap-6">
        <Input
          type="email"
          placeholder="name@work-email.com"
          value={email}
          onChange={onChange}
          isInvalid={!!error}
          hint={error}
          isRequired
        />

        <Button
          className="w-full"
          color="primary"
          iconTrailing={ArrowRight}
          onClick={handleOnNext}
          size="md"
          isLoading={isLoading}
          isDisabled={!email?.trim() || !!error}
        >
          Continue
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-primary w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-primary text-tertiary px-2">or</span>
          </div>
        </div>

        <Button
          className="w-full"
          color="secondary"
          size="md"
          onClick={onGoogleAuth}
          isLoading={ssoIsLoading}
          iconLeading={({ className }) => <GoogleIcon className={className} />}
        >
          Continue with Google
        </Button>

        <div className="flex flex-col gap-3">
          <p className="text-tertiary text-center text-xs">
            By creating an account, you agree to our{' '}
            {/* TODO: update the links */}
            <a
              href="/terms"
              className="text-brand-tertiary hover:text-brand-secondary_hover"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              className="text-brand-tertiary hover:text-brand-secondary_hover"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </StepContainer>
  )
}
