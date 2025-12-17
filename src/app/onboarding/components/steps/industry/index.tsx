import { ArrowRight } from '@untitledui/icons'
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Button } from '@/components/base/buttons/button'
import { Select } from '@/components/base/select/select'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useDebounceFn } from '@/hooks/use-debounce-fn'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import { useStepTimer } from '@/hooks/use-step-timer'
import { brandSelectState } from '@/store/brand'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectFirstName,
  onboardingSelectIndustry,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { trackEvent } from '@/utils/segment/analytics'

import {
  INDUSTRIES_ITEMS,
  INDUSTRIES_MAPPING,
  IndustryId,
  OTHER_INDUSTRIES_ITEMS,
  OTHER_INDUSTRIES_MAPPING,
} from './constants'
import { findMatchingIndustry } from './utils'
import { useScroll } from '@/hooks/use-scroll'

export const SignupIndustryStep = () => {
  const selectedIndustry = useAppSelector(onboardingSelectIndustry) as
    | IndustryId
    | undefined

  const isOtherSelected =
    !!selectedIndustry &&
    (!!OTHER_INDUSTRIES_MAPPING[
      selectedIndustry as keyof typeof OTHER_INDUSTRIES_MAPPING
    ] ||
      selectedIndustry === IndustryId.OTHER)

  const [showIndustrySearch, setShowIndustrySearch] = useState(isOtherSelected)
  const { getTimeSpent } = useStepTimer()

  const hasSelectedOtherIndustry = useMemo(() => {
    return (
      selectedIndustry &&
      (!!OTHER_INDUSTRIES_MAPPING[
        selectedIndustry as keyof typeof OTHER_INDUSTRIES_MAPPING
      ] ||
        OTHER_INDUSTRIES_ITEMS.some(item => item.id === selectedIndustry))
    )
  }, [selectedIndustry])

  const brandData = useAppSelector(brandSelectState)
  const firstName = useAppSelector(onboardingSelectFirstName)

  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(onboardingGoToNextStep())
  }

  const preselectedIndustry = useMemo(() => {
    if (
      brandData?.company?.industries &&
      brandData.company.industries.length > 0 &&
      !selectedIndustry
    ) {
      const brandIndustry = brandData.company.industries[0]
      return findMatchingIndustry(brandIndustry.name)?.id || null
    }
    return null
  }, [brandData, selectedIndustry])

  useEffect(() => {
    if (preselectedIndustry) {
      trackEvent('signup_industry_preselected', {
        suggested_industry: preselectedIndustry,
        source: 'brandfetch',
      })
    }
  }, [preselectedIndustry])

  const isPreselected = !selectedIndustry && !!preselectedIndustry

  const industrySearchRef = useRef<HTMLDivElement>(null)

  const onSelectItem = (id: IndustryId) => {
    const wasPreselected = isPreselected
    const acceptedSuggestion = wasPreselected && id === preselectedIndustry

    trackEvent('signup_industry_selected', {
      industry: id,
      was_preselected: wasPreselected,
      accepted_suggestion: acceptedSuggestion,
      time_spent_on_step: getTimeSpent(),
    })

    dispatch(onboardingAppendForm({ industry: id }))
    if (id === IndustryId.OTHER) {
      trackEvent('signup_industry_other_clicked')
      setShowIndustrySearch(true)
    } else {
      onNext()
    }
  }

  const onContinueWithPreSelect = () => {
    if (!preselectedIndustry) return
    trackEvent('signup_industry_selected', {
      industry: preselectedIndustry,
      was_preselected: true,
      accepted_suggestion: true,
      time_spent_on_step: getTimeSpent(),
    })
    dispatch(onboardingAppendForm({ industry: preselectedIndustry }))
    onNext()
  }

  useEnterToSubmit(
    () => {
      if (isPreselected && preselectedIndustry) {
        onContinueWithPreSelect()
      } else if (showIndustrySearch) {
        onNext()
      }
    },
    (isPreselected && !!preselectedIndustry) || showIndustrySearch,
  )

  const prevShowIndustrySearch = useRef(showIndustrySearch)
  const { scrollToEnd } = useScroll()
  const scrollToEndEffect = useEffectEvent(() => {
    scrollToEnd()
  })

  const trackSearchEvent = useCallback(
    (query: string, resultsCount: number) => {
      trackEvent('signup_industry_searched', {
        search_query: query,
        results_count: resultsCount,
      })
    },
    [],
  )

  const debouncedTrackSearch = useDebounceFn(trackSearchEvent, 300)

  useEffect(() => {
    if (!showIndustrySearch || prevShowIndustrySearch.current) {
      prevShowIndustrySearch.current = showIndustrySearch
      return
    }
    // Add delay to ensure the scroll is complete
    scrollToEndEffect()
    setTimeout(() => {
      const input = industrySearchRef.current?.querySelector('input')
      if (input) {
        input.focus()
        input.click()
      }
    }, 150)
  }, [showIndustrySearch])

  return (
    <StepContainer
      title="What industry are you in?"
      topSlot={
        <div>
          <p className="text-tertiary text-lg">
            Nice to meet you <span className="font-bold">{firstName}</span>!
          </p>
        </div>
      }
      footer={
        (showIndustrySearch || isPreselected || !!selectedIndustry) && (
          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row-reverse lg:justify-start lg:gap-6">
            {isPreselected ? (
              <Button
                iconTrailing={ArrowRight}
                onClick={onContinueWithPreSelect}
                className="w-full lg:w-auto"
                size="sm"
              >
                Continue
              </Button>
            ) : (
              (showIndustrySearch || !!selectedIndustry) &&
              (hasSelectedOtherIndustry ||
              !!(selectedIndustry && selectedIndustry !== IndustryId.OTHER) ? (
                <Button
                  iconTrailing={ArrowRight}
                  onClick={onNext}
                  size="sm"
                  className="w-full lg:w-auto"
                >
                  Continue
                </Button>
              ) : (
                <div className="flex justify-center py-2 lg:justify-end lg:py-0">
                  <Button onClick={onNext} color="link-brand" size="sm">
                    Skip, and Continue →
                  </Button>
                </div>
              ))
            )}
          </div>
        )
      }
    >
      <div className="flex flex-col gap-6">
        {preselectedIndustry &&
          INDUSTRIES_MAPPING[
            preselectedIndustry as keyof typeof INDUSTRIES_MAPPING
          ] && (
            <div className="text-left">
              <p className="text-tertiary text-sm">
                {`Based on your company data, we think your industry is "
              ${INDUSTRIES_MAPPING[preselectedIndustry as keyof typeof INDUSTRIES_MAPPING]?.name}". Feel free to
              select something else if this doesn't look right.`}
              </p>
            </div>
          )}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {INDUSTRIES_ITEMS.map(industry => (
            <button
              key={industry.id}
              onClick={() => onSelectItem(industry.id)}
              className={cx(
                'relative flex h-14 items-center justify-center rounded-lg border p-3 text-center transition-all hover:shadow-sm sm:h-16 sm:p-4',
                selectedIndustry === industry.id ||
                  (industry.id === IndustryId.OTHER && showIndustrySearch) ||
                  industry.id === preselectedIndustry
                  ? 'border-brand-400 solid selected-item-bg shadow-sm'
                  : 'border-secondary hover:border-primary',
              )}
            >
              <span className="text-primary text-xs font-medium sm:text-sm">
                {industry.name}
              </span>
            </button>
          ))}
        </div>

        {showIndustrySearch ? (
          <div className="flex flex-col gap-6">
            <Select.ComboBox
              ref={industrySearchRef}
              label="Search industries"
              placeholder="Type to search..."
              items={OTHER_INDUSTRIES_ITEMS}
              selectedKey={selectedIndustry}
              onSelectionChange={value => {
                if (value) onSelectItem(value as IndustryId)
              }}
              onInputChange={value => {
                if (value) {
                  const results = OTHER_INDUSTRIES_ITEMS.filter(item =>
                    item.label.toLowerCase().includes(value.toLowerCase()),
                  )
                  debouncedTrackSearch(value, results.length)
                }
              }}
            >
              {item => (
                <Select.Item id={item.id} supportingText={item.supportingText}>
                  {item.label}
                </Select.Item>
              )}
            </Select.ComboBox>
          </div>
        ) : null}
      </div>
    </StepContainer>
  )
}
