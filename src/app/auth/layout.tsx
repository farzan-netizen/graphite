'use client'
import '@/styles/globals.css'
import { RoutePaths } from '@/constants/routes'
import { useRouter } from '@/hooks/use-router'
import { useEffect } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { EnvVariables } from '@/constants/env-variables'

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  useEffect(() => {
    // Prefetch next page
    router.prefetch(RoutePaths.ONBOARDING)
  }, [])

  return (
    <GoogleReCaptchaProvider
      useEnterprise
      reCaptchaKey={
        EnvVariables.ENABLE_RECAPTCHA ? EnvVariables.RECAPTCHA_SITE_KEY : ''
      }
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
