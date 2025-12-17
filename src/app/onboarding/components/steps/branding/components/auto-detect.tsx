import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  onboardingSelectWebsiteUrl,
  onboardingAppendForm,
  onboardingSelectPrimaryColor,
  onboardingSelectLogoUrl,
  onboardingSelectEmail,
} from '@/store/onboarding'
import { Loading01, AlertCircle, InfoCircle } from '@untitledui/icons'
import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useEffectEvent,
} from 'react'
import {
  brandFetchData,
  brandSelectState,
  brandReset,
  type BrandState,
} from '@/store/brand'
import { getApiErrorMessage } from '@/utils/api-error'
import { isWebsiteDark, isValidWebsiteUrl } from '../utils'
import { isWorkEmail } from '@/utils/email'
import { DEFAULT_COLOR } from '../constants'
import { DetectedBrandCard } from './detected-brand-card'
import { UrlInputForm } from './url-input-form'
import { trackEvent } from '@/utils/segment/analytics'
import { useDebounceFn } from '@/hooks/use-debounce-fn'

interface Props {
  isLoading?: boolean
  setIsLoading: (value: boolean) => void
  hasBrandData?: boolean
}

export const WizardBrandingStepAutoDetect = ({
  isLoading,
  setIsLoading,
  hasBrandData,
}: Props) => {
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const [isInitialFetch, setIsInitialFetch] = useState(true)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const wasFocusedRef = useRef(false)

  const websiteUrl = useAppSelector(onboardingSelectWebsiteUrl)
  const detectedBrand = useAppSelector(brandSelectState)
  const email = useAppSelector(onboardingSelectEmail)
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const selectedLogoUrl = useAppSelector(onboardingSelectLogoUrl)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    if (wasFocusedRef.current && inputRef.current) {
      requestAnimationFrame(() => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus()
          const length = inputRef.current.value.length
          inputRef.current.setSelectionRange(length, length)
        }
        wasFocusedRef.current = false
      })
    }
  }, [error, hasUserInteracted])

  const debouncedTrackWebsiteUrlEntered = useDebounceFn(
    (value: string, domain: string) => {
      trackEvent('wizard_website_url_entered', {
        domain,
        is_valid_url: isValidWebsiteUrl(value),
        // TODO: Add is_update flag
        // is_update: false,
      })
    },
    500,
  )
  const handleUrlChange = (value: string) => {
    wasFocusedRef.current = inputRef.current === document.activeElement
    setError('')
    setHasUserInteracted(true)
    setIsInitialFetch(false)

    const domain = value.replace(/^https?:\/\//, '').split('/')[0]
    debouncedTrackWebsiteUrlEntered(value, domain)
    dispatch(onboardingAppendForm({ websiteUrl: value }))
  }

  const handleFocus = () => {
    wasFocusedRef.current = true
  }

  const handleBlur = () => {
    wasFocusedRef.current = false
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const url = String(websiteUrl || '').trim()
      if (url && isValidWebsiteUrl(url)) {
        getBrand()
      }
    }
  }

  const resetToDefaults = () => {
    dispatch(brandReset())
    dispatch(
      onboardingAppendForm({
        primaryColor: DEFAULT_COLOR,
        logoUrl: '',
        previewTheme: 'light',
      }),
    )
  }

  const handleDiscard = () => {
    resetToDefaults()
    setIsEditingUrl(false)
  }

  const selectValuesFromBrand = (data: BrandState) => {
    const isDark = !!data && isWebsiteDark(data)
    dispatch(onboardingAppendForm({ previewTheme: isDark ? 'dark' : 'light' }))

    const logos = data?.logos
    if (logos && logos.length > 0 && !selectedLogoUrl) {
      const squareLogo =
        logos.find(
          logo =>
            ('type' in logo && logo.type?.toLowerCase() === 'square') ||
            logo.formats?.some(
              format =>
                'width' in format &&
                'height' in format &&
                format.width === format.height,
            ),
        ) || logos[0]

      const formats = squareLogo?.formats
      if (formats && formats.length > 0) {
        const svgFormat = formats.find(f => 'format' in f && f.format === 'svg')
        const pngFormat = formats.find(f => 'format' in f && f.format === 'png')
        const bestFormat = svgFormat || pngFormat || formats[0]
        if (bestFormat?.src) {
          dispatch(onboardingAppendForm({ logoUrl: bestFormat.src }))
        }
      }
    } else if (!selectedLogoUrl) {
      dispatch(onboardingAppendForm({ logoUrl: '' }))
    }

    if (data?.colors?.[0]?.hex) {
      if (!primaryColor || primaryColor === DEFAULT_COLOR) {
        dispatch(onboardingAppendForm({ primaryColor: data.colors[0].hex }))
      }
    } else if (!primaryColor || primaryColor === DEFAULT_COLOR) {
      dispatch(onboardingAppendForm({ primaryColor: DEFAULT_COLOR }))
    }
  }
  const getBrand = async (urlParam?: string, onFail?: () => void) => {
    setError('')
    const url = String(urlParam || websiteUrl || '').trim()
    if (!url) return

    const domain = url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]

    if (domain && domain !== websiteUrl) {
      dispatch(onboardingAppendForm({ websiteUrl: domain }))
    }

    if (!isInitialFetch || hasUserInteracted) {
      setHasUserInteracted(true)
    }

    trackEvent('wizard_brand_auto_detect_started', { website_url: domain })
    const startTime = Date.now()

    setIsLoading(true)
    try {
      const data = await dispatch(brandFetchData(domain))
      selectValuesFromBrand(data)

      trackEvent('wizard_brand_auto_detect_completed', {
        success: !!data?.name,
        logo_found: (data?.logos?.length ?? 0) > 0,
        color_detected: !!data?.colors?.[0]?.hex,
        brand_name: data?.name,
        detection_time: Date.now() - startTime,
      })

      if (data?.name) {
        setIsEditingUrl(false)
      }
    } catch (err) {
      trackEvent('wizard_brand_auto_detect_completed', {
        success: false,
        logo_found: false,
        color_detected: false,
        detection_time: Date.now() - startTime,
      })

      const errorMessage = getApiErrorMessage(err)
      setError(
        errorMessage ||
          'Failed to detect branding. Please try again or set it manually.',
      )
      resetToDefaults()
      onFail?.()
    } finally {
      setIsLoading(false)
    }
  }

  const brandData = useAppSelector(brandSelectState)
  const getBrandEffect = useEffectEvent(async () => {
    if (
      hasBrandData ||
      (primaryColor && primaryColor !== DEFAULT_COLOR) ||
      selectedLogoUrl
    ) {
      setIsInitialFetch(false)
      selectValuesFromBrand(brandData)
      return
    }

    if (!isInitialFetch) return

    if (email && isWorkEmail(email)) {
      const domain = websiteUrl || email.split('@').pop()?.toLowerCase()
      if (!domain || !isValidWebsiteUrl(domain)) {
        setIsInitialFetch(false)
        return
      }

      if (!websiteUrl) {
        dispatch(onboardingAppendForm({ websiteUrl: domain }))
      }

      try {
        await getBrand(domain)
      } finally {
        setIsInitialFetch(false)
      }
    } else {
      setIsInitialFetch(false)
    }
  })

  useEffect(() => {
    getBrandEffect()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-secondary border-tertiary rounded-lg border p-3 transition-all duration-200">
        <div className="flex items-center gap-2">
          <Loading01 className="text-brand-secondary h-4 w-4 animate-spin" />
          <span className="text-primary text-sm">Detecting branding...</span>
        </div>
      </div>
    )
  }

  if (hasBrandData && detectedBrand?.name && !isEditingUrl) {
    return (
      <div className="bg-secondary border-tertiary rounded-lg border p-3 transition-all duration-200">
        <DetectedBrandCard
          brand={detectedBrand}
          onDiscard={handleDiscard}
          onChangeUrl={() => setIsEditingUrl(true)}
        />
      </div>
    )
  }

  if (error && !hasUserInteracted) {
    const domainHint =
      email && isWorkEmail(email)
        ? email.split('@').pop()?.toLowerCase()
        : websiteUrl || 'your email domain'

    return (
      <div className="bg-secondary border-tertiary rounded-lg border p-3 transition-all duration-200">
        <div className="px-1 py-2">
          <p className="text-tertiary flex items-start gap-2 text-sm leading-relaxed">
            <InfoCircle className="text-tertiary mt-0.5 h-4 w-4 shrink-0" />
            <span className="whitespace-normal">
              {`We couldn't detect your brand from `}
              <span className="text-tertiary font-bold italic">
                {domainHint}
              </span>
              .<br />
              <button
                onClick={() => {
                  setIsInitialFetch(false)
                  setHasUserInteracted(true)
                }}
                className="text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-1"
              >
                Try another URL
              </button>
              . You can skip this step and continue with the default setup,
              everything can be customized later.
            </span>
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-secondary border-tertiary rounded-lg border p-3 transition-all duration-200">
        <UrlInputForm
          ref={inputRef}
          value={String(websiteUrl || '')}
          onChange={handleUrlChange}
          onSubmit={() => getBrand()}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isInvalid={true}
          buttonLabel="Retry"
        />
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <div className="text-error-primary flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary border-tertiary rounded-lg border p-3 transition-all duration-200">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-primary text-sm font-medium">
            Auto-detect branding
          </span>
          {isEditingUrl && hasBrandData && detectedBrand && (
            <button
              onClick={() => {
                setIsEditingUrl(false)
                setError('')
              }}
              className="text-tertiary hover:text-tertiary_hover text-xs underline underline-offset-1"
            >
              Cancel
            </button>
          )}
        </div>
        <UrlInputForm
          ref={inputRef}
          value={String(websiteUrl || '')}
          onChange={handleUrlChange}
          onSubmit={() => getBrand()}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isInvalid={!!error}
          buttonLabel="Fetch branding"
        />
        <p className="text-tertiary text-xs">
          {`We'll automatically detect your logo and brand colors`}
        </p>
      </div>
    </div>
  )
}
