import { ArrowRight } from '@untitledui/icons'
import { useState, useEffect, useRef, useEffectEvent } from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useStepTimer } from '@/hooks/use-step-timer'
import { brandSelectState } from '@/store/brand'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectLogoUrl,
  onboardingSelectPreviewTheme,
  onboardingSelectPrimaryColor,
} from '@/store/onboarding'
import { trackEvent } from '@/utils/segment/analytics'

import { WizardBrandingStepAutoDetect } from './components/auto-detect'
import { WizardBrandingStepColors } from './components/colors'
import { WizardBrandingStepLogoOptions } from './components/logo-options'
import { WizardBrandingStepTheme } from './components/theme'
import { DEFAULT_COLOR } from './constants'

export const WizardBrandingStep = () => {
  const previewTheme = useAppSelector(onboardingSelectPreviewTheme)
  const brandData = useAppSelector(brandSelectState)
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const logoUrl = useAppSelector(onboardingSelectLogoUrl)
  const dispatch = useAppDispatch()
  const { getTimeSpent } = useStepTimer()
  const initialColor = useRef(primaryColor)

  const [isLoading, setIsLoading] = useState(false)
  const hasBrandData = !!brandData?.name
  const hasLogo = !!(brandData?.logos && brandData.logos.length > 0)
  const hasColor = !!(brandData?.colors && brandData.colors.length > 0)

  const trackBrandingViewed = useEffectEvent(() => {
    trackEvent('wizard_branding_viewed', {
      has_brand_data: hasBrandData,
      auto_detected_logo: hasLogo,
      auto_detected_color: hasColor,
      brand_source: hasBrandData ? 'brandfetch' : 'none',
    })
  })
  useEffect(() => {
    trackBrandingViewed()
  }, [])

  useEffect(() => {
    if (!primaryColor) {
      dispatch(onboardingAppendForm({ primaryColor: DEFAULT_COLOR }))
    }
  }, [primaryColor, dispatch])

  const onNext = () => {
    const logoSource = logoUrl
      ? logoUrl.includes('brandfetch') || logoUrl.includes('clearbit')
        ? 'brandfetch'
        : 'custom_upload'
      : 'no_logo'
    const colorSource =
      primaryColor === initialColor.current
        ? hasColor
          ? 'brandfetch'
          : 'default'
        : 'custom'

    trackEvent('wizard_branding_submitted', {
      has_logo: !!logoUrl,
      logo_source: logoSource,
      primary_color: primaryColor,
      color_source: colorSource,
      preview_theme: previewTheme || 'light',
      used_auto_detection: hasBrandData,
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(onboardingGoToNextStep())
  }

  const description = hasBrandData
    ? "We've detected your brand. Customize or continue with these settings."
    : 'Enter your website URL to automatically detect your brand, or set it manually.'

  return (
    <StepContainer
      title="Branding"
      description={description}
      footer={
        <div className="flex flex-col items-center gap-3 lg:flex-row-reverse lg:justify-start lg:pt-3">
          <Button
            isDisabled={isLoading}
            iconTrailing={ArrowRight}
            onClick={onNext}
            size="sm"
            className="w-full lg:w-auto"
          >
            Continue
          </Button>
        </div>
      }
    >
      <div>
        <div className="space-y-4">
          <WizardBrandingStepAutoDetect
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            hasBrandData={hasBrandData}
          />

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <WizardBrandingStepLogoOptions isLoading={isLoading} />
              <WizardBrandingStepTheme previewTheme={previewTheme} />
            </div>
            <WizardBrandingStepColors isLoading={isLoading} />
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-tertiary text-xs">
            You can fine-tune colors and logo anytime in Settings.
          </p>
        </div>
      </div>
    </StepContainer>
  )
}
