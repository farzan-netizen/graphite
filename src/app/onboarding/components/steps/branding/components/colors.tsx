import {
  onboardingAppendForm,
  onboardingSelectPrimaryColor,
} from '@/store/onboarding'
import { DEFAULT_COLOR, PRESET_COLORS } from '../constants'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { cx } from '@/utils/cx'
import { brandSelectState } from '@/store/brand'
import { useMemo, useRef } from 'react'
import { trackEvent } from '@/utils/segment/analytics'

interface Props {
  isLoading?: boolean
}

export const WizardBrandingStepColors = ({ isLoading }: Props) => {
  const brandData = useAppSelector(brandSelectState)
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const dispatch = useAppDispatch()
  const initialColor = useRef(primaryColor)

  const normalizeColor = (color: string) => {
    if (!color) return ''
    const normalized = color.toUpperCase().trim()
    return normalized.startsWith('#') ? normalized : `#${normalized}`
  }

  const displayColors = useMemo(() => {
    const suggestedColors = brandData?.colors?.filter(i => !!i.hex) || []
    const colors =
      suggestedColors.length === 0
        ? PRESET_COLORS
        : suggestedColors.map(c => c.hex)

    const normalizedColors = colors.map(normalizeColor)
    return Array.from(new Set(normalizedColors))
  }, [brandData?.colors])

  const selectedColor = primaryColor ? normalizeColor(primaryColor) : null

  const handleColorSelect = (color: string) => {
    if (primaryColor === color) {
      return
    }
    const wasAutoDetected =
      brandData?.colors?.some(
        c => normalizeColor(c.hex) === normalizeColor(color),
      ) ?? false

    trackEvent('wizard_primary_color_changed', {
      new_color: color,
      previous_color: primaryColor,
      was_auto_detected: wasAutoDetected,
      source: wasAutoDetected ? 'brandfetch' : 'color_picker',
    })

    dispatch(onboardingAppendForm({ primaryColor: color }))
  }

  return (
    <div className="bg-primary border-secondary rounded-lg border p-3">
      <h3 className="text-primary mb-2 text-sm font-medium">Brand colors</h3>

      <div className="flex flex-wrap items-center gap-1">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-tertiary h-7 w-7 animate-pulse rounded-full"
            />
          ))
        ) : (
          <>
            {displayColors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                onClick={() => handleColorSelect(color)}
                className={cx(
                  'h-7 w-7 rounded-full border-2 transition-all',
                  selectedColor === color
                    ? 'border-brand-400 ring-brand-400/20 scale-105 ring-2'
                    : 'border-secondary hover:border-tertiary',
                )}
                style={{ backgroundColor: color }}
              />
            ))}

            <div className="relative h-7 w-7">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
                }}
              />
              <input
                type="color"
                value={primaryColor || '#000000'}
                onChange={e => handleColorSelect(e.target.value)}
                className="border-secondary hover:border-tertiary absolute inset-0 h-full w-full cursor-pointer rounded-full border-2 p-0 opacity-0 transition-all [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
                style={{
                  borderRadius: '50%',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  MozAppearance: 'none',
                }}
              />
            </div>

            <input
              type="text"
              value={primaryColor || ''}
              onChange={e => handleColorSelect(e.target.value)}
              className="border-secondary bg-primary text-primary min-w-[80px] flex-1 rounded-lg border px-2 py-1 text-xs"
              placeholder={DEFAULT_COLOR}
            />
          </>
        )}
      </div>
    </div>
  )
}
