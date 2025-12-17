import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { brandSelectState } from '@/store/brand'
import {
  onboardingAppendForm,
  onboardingSelectLogoUrl,
  onboardingSelectWebsiteUrl,
  onboardingSelectCommunityName,
  onboardingSelectExistingCommunityName,
  onboardingSelectPrimaryColor,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { Upload01 } from '@untitledui/icons'
import { useMemo, useRef, useState } from 'react'
import { Image } from '@/components/base/image'
import { uploadImages } from '@/app/server-actions/upload-images'
import { Loading } from '@/components/base/loading'
import { SelectionIndicator } from './selection-indicator'
import { DEFAULT_COLOR } from '../constants'
import { trackEvent } from '@/utils/segment/analytics'

interface Props {
  isLoading?: boolean
}

export const WizardBrandingStepLogoOptions = ({ isLoading }: Props) => {
  const brandData = useAppSelector(brandSelectState)
  const selectedLogoUrl = useAppSelector(onboardingSelectLogoUrl)
  const websiteUrl = useAppSelector(onboardingSelectWebsiteUrl)
  const communityName = useAppSelector(onboardingSelectCommunityName)
  const existingCommunityName = useAppSelector(
    onboardingSelectExistingCommunityName,
  )
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const dispatch = useAppDispatch()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const suggestedLogos = useMemo(() => {
    if (!brandData.logos || !Array.isArray(brandData.logos)) return []

    const logoUrls: string[] = []
    brandData.logos.forEach(logoGroup => {
      if (logoGroup.formats && Array.isArray(logoGroup.formats)) {
        const svgFormat = logoGroup.formats.find(f => f.format === 'svg')
        const pngFormat = logoGroup.formats.find(f => f.format === 'png')
        const bestFormat = svgFormat || pngFormat || logoGroup.formats[0]
        if (bestFormat?.src) {
          logoUrls.push(bestFormat.src)
        }
      }
    })
    return logoUrls.slice(0, 8)
  }, [brandData])

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(
    selectedLogoUrl && suggestedLogos.every(url => url !== selectedLogoUrl)
      ? selectedLogoUrl
      : undefined,
  )

  const handleSelectLogo = (logoUrl: string) => {
    const isAutoDetected = suggestedLogos.includes(logoUrl)
    const logoOption = !logoUrl
      ? 'no_logo'
      : isAutoDetected
        ? 'auto_detected'
        : 'custom_upload'

    trackEvent('wizard_logo_option_selected', {
      logo_option: logoOption,
      has_logo: !!logoUrl,
    })

    dispatch(onboardingAppendForm({ logoUrl }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleFileSelect = async (file: File) => {
    if (!file?.type.startsWith('image/')) return

    try {
      setIsUploading(true)
      dispatch(onboardingAppendForm({ logoUrl: '' }))

      const result = await uploadImages([
        { file, name: file.name ?? '', contentType: file.type ?? '' },
      ])

      trackEvent('wizard_logo_uploaded', {
        file_size: file.size,
        file_type: file.type,
        upload_success: result.success,
      })

      if (result.success) {
        setUploadedLogoUrl(result.data[0].url)
        dispatch(onboardingAppendForm({ logoUrl: result.data[0].url }))
      } else {
        setUploadError(result.error)
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const getDefaultLogoLetter = () => {
    const name = existingCommunityName || communityName
    if (name) return name[0]?.toUpperCase()

    const brandName = brandData?.name
    if (brandName) return brandName[0]?.toUpperCase()

    const domain = websiteUrl || brandData?.domain
    if (domain) {
      const firstChar = domain
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('.')[0]?.[0]
      return firstChar?.toUpperCase() || '?'
    }
    return '?'
  }

  return (
    <div className="bg-primary border-secondary flex h-full flex-col rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-primary text-sm font-medium">Brand logo</h3>
      </div>

      <div className="flex flex-1 flex-col">
        {isLoading ? (
          <div className="mb-3 grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-tertiary aspect-square animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-3 grid grid-cols-4 gap-1">
              {suggestedLogos.length === 0 ? (
                <button
                  onClick={() => handleSelectLogo('')}
                  className={cx(
                    'bg-tertiary relative flex aspect-square items-center justify-center rounded-lg border-2 p-1 transition-all',
                    !selectedLogoUrl
                      ? 'border-brand-400 bg-tertiary/80'
                      : 'border-secondary hover:border-tertiary',
                  )}
                >
                  <div
                    className="flex h-full w-full items-center justify-center rounded text-xl font-semibold text-white"
                    style={{ backgroundColor: primaryColor || DEFAULT_COLOR }}
                  >
                    <span>{getDefaultLogoLetter()}</span>
                  </div>
                  <SelectionIndicator isSelected={!selectedLogoUrl} />
                </button>
              ) : (
                suggestedLogos.map((logoUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLogo(logoUrl)}
                    className={cx(
                      'bg-tertiary relative flex aspect-square items-center justify-center rounded-lg border-2 p-1 transition-all',
                      selectedLogoUrl === logoUrl
                        ? 'border-brand-400 bg-tertiary/80'
                        : 'border-secondary hover:border-tertiary',
                    )}
                  >
                    <Image
                      src={logoUrl}
                      alt="brand logo"
                      className="max-h-full max-w-full object-contain"
                      width={48}
                      height={48}
                    />
                    <SelectionIndicator
                      isSelected={selectedLogoUrl === logoUrl}
                    />
                  </button>
                ))
              )}
            </div>

            <div className="space-y-2">
              {uploadError && (
                <div className="bg-error-primary/10 border-error-primary/30 rounded-lg border p-2.5">
                  <p className="text-error-primary text-xs">{uploadError}</p>
                </div>
              )}

              <div
                className={cx(
                  'cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors',
                  dragActive
                    ? 'border-brand-400 bg-brand-primary/5'
                    : uploadError
                      ? 'border-error-primary/50'
                      : 'border-tertiary hover:border-secondary',
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
              >
                <Loading isLoading={isUploading}>
                  {uploadedLogoUrl ? (
                    <div className="space-y-1.5">
                      <div
                        className={cx(
                          'bg-tertiary relative m-auto aspect-square h-fit w-fit rounded-lg border-2 p-1',
                          selectedLogoUrl === uploadedLogoUrl &&
                            'border-brand-400',
                        )}
                      >
                        <Image
                          style={{ objectFit: 'cover' }}
                          src={uploadedLogoUrl}
                          alt="Logo preview"
                          className="mx-auto h-14 w-14 rounded-lg object-contain"
                          width={56}
                          height={56}
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSelectLogo(uploadedLogoUrl)
                          }}
                        />
                        <SelectionIndicator
                          isSelected={selectedLogoUrl === uploadedLogoUrl}
                        />
                      </div>
                      <button className="text-brand-secondary hover:text-brand-secondary_hover text-xs">
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Upload01 className="text-quaternary mx-auto h-7 w-7" />
                      <p className="text-tertiary text-xs">
                        Drop logo here or{' '}
                        <span className="text-brand-secondary hover:text-brand-secondary_hover font-medium underline underline-offset-1">
                          browse files
                        </span>
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </Loading>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
