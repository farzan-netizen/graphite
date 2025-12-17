'use client'

import { SignupSideBar } from '@/app/components/sidebar'
import { PageContainer } from '@/app/components/page-container'
import { AuthEmailStep } from './email'
import { AuthEmailVerification } from './email-verification'
import { useRouter } from '@/hooks/use-router'
import { trackEvent } from '@/utils/segment/analytics'
import { useEffect } from 'react'

interface AuthFormProps {
  step: 'signup' | 'signin' | 'verify'
}
export const AuthForm = ({ step }: AuthFormProps) => {
  useEffect(() => {
    trackEvent('signup_started')
  }, [])

  const router = useRouter()

  const onBack = () => {
    router.back()
  }

  return (
    <PageContainer
      hideProgressBar
      hideSteps
      onBack={onBack}
      currentStep={step === 'verify' ? 2 : 1}
      contentClassName="max-w-sm sm:max-w-md"
      rightSideBar={<SignupSideBar />}
    >
      <div>
        {step === 'verify' ? (
          <AuthEmailVerification onBack={onBack} />
        ) : (
          <AuthEmailStep />
        )}
      </div>
    </PageContainer>
  )
}
