'use client'

import { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/store'
import { Confetti, type ConfettiRef } from '@/components/base/confetti'
import { Switch } from '@/components/base/switch/switch'
import { appSelectIsDarkMode } from '@/store/app'

export const SignupStepSuccess = () => {
  const confettiRef = useRef<ConfettiRef>(null)
  const [switchChecked, setSwitchChecked] = useState(false)
  const isDarkMode = useAppSelector(appSelectIsDarkMode)

  const brandColor = '#0AC06C'

  useEffect(() => {
    // Fire confetti when component mounts
    confettiRef.current?.fire({})

    // Auto switch after a short delay (same time as confetti)
    const timer = setTimeout(() => {
      setSwitchChecked(true)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
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
      <div className="relative z-10 max-w-2xl text-center">
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          <span>{`Perfect! Let's build your `} </span>
          <span className="inline-flex items-baseline leading-none whitespace-nowrap">
            c
            <span
              className="inline-block"
              style={{
                verticalAlign: 'bottom',
                marginTop: '0.05em',
                marginLeft: '0.05em',
                marginRight: '0.05em',
              }}
            >
              <Switch checked={switchChecked} brandColor={brandColor} />
            </span>
            mmunity.
          </span>
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-gray-600 sm:text-2xl dark:text-white">
          {`We'll guide you through setting up your community with the enterprise
          features you selected.`}
        </p>

        <div className="text-lg text-gray-500 dark:text-white">
          <span>Redirecting to community setup...</span>
        </div>
      </div>
    </div>
  )
}
