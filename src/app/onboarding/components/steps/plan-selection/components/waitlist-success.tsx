import { useRef, useEffect } from 'react'
import { useAppSelector } from '@/hooks/store'
import {
  onboardingSelectCommunityName,
  onboardingSelectExistingCommunityName,
} from '@/store/onboarding'
import { Confetti, type ConfettiRef } from '@/components/base/confetti'
import { appSelectIsDarkMode } from '@/store/app'

export const WaitListSuccess = () => {
  const communityName = useAppSelector(onboardingSelectCommunityName)
  const existingCommunityName = useAppSelector(
    onboardingSelectExistingCommunityName,
  )
  const confettiRef = useRef<ConfettiRef>(null)
  const isDarkMode = useAppSelector(appSelectIsDarkMode)

  // Use green color (#0AC06C) for gradient
  const brandColor = '#0AC06C'

  useEffect(() => {
    // Fire confetti when component mounts
    confettiRef.current?.fire({})
  }, [])

  // Background style based on theme
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
      {/* Success Content */}
      <div className="relative z-10 max-w-2xl text-center">
        {/* Success Message */}
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          {communityName
            ? `You're on the list, ${communityName}!`
            : existingCommunityName
              ? "You're on the waitlist!"
              : `Welcome to the waitlist!`}
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-gray-600 sm:text-2xl dark:text-white">
          {`We'll contact you soon to get you started with your community.`}
        </p>

        <p className="mb-8 text-lg text-gray-500 dark:text-gray-300">
          Thank you for your interest...
        </p>
      </div>
    </div>
  )
}
