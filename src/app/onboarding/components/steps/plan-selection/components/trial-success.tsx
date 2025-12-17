'use client'

import { useRef, useEffect } from 'react'
import { useAppSelector } from '@/hooks/store'
import { onboardingSelectCommunityName } from '@/store/onboarding'
import { Confetti, type ConfettiRef } from '@/components/base/confetti'
import { appSelectIsDarkMode } from '@/store/app'

export const TrialSuccess = () => {
  const communityName = useAppSelector(onboardingSelectCommunityName)
  const confettiRef = useRef<ConfettiRef>(null)
  const isDarkMode = useAppSelector(appSelectIsDarkMode)

  const brandColor = '#0AC06C'

  useEffect(() => {
    confettiRef.current?.fire({})
  }, [])

  const backgroundStyle = isDarkMode
    ? {
        background: `linear-gradient(120deg, ${brandColor}15 0%, ${brandColor}25 25%, ${brandColor}35 50%, ${brandColor}25 75%, ${brandColor}15 100%), #2A2A2A`,
      }
    : {
        background: `linear-gradient(120deg, ${brandColor}15 0%, ${brandColor}25 25%, ${brandColor}35 50%, ${brandColor}25 75%, ${brandColor}15 100%), #ffffff`,
      }

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 fixed inset-0 z-50 flex items-center justify-center p-8 duration-1000"
      style={backgroundStyle}
    >
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full"
        manualstart
      />
      <div className="relative z-10 max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          {communityName
            ? `${communityName} is ready!`
            : 'Your community is ready!'}
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-gray-600 sm:text-2xl dark:text-white">
          {`We're setting up your community and preparing everything for launch.`}
        </p>

        <div className="text-lg text-gray-500 dark:text-white">
          <span>Redirecting to onboarding...</span>
        </div>
      </div>
    </div>
  )
}
