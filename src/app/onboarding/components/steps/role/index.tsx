import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react'

import { StepContainer } from '@/app/components/step-container'
import { Select } from '@/components/base/select/select'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useDebounceFn } from '@/hooks/use-debounce-fn'
import { useEnterToSubmit } from '@/hooks/use-enter-to-submit'
import {
  onboardingAppendForm,
  onboardingGoToNextStep,
  onboardingSelectFirstName,
  onboardingSelectRole,
} from '@/store/onboarding'
import { cx } from '@/utils/cx'
import { trackEvent } from '@/utils/segment/analytics'

import {
  OTHER_ROLE_ITEMS,
  ROLE_OPTION_ITEMS,
  ROLE_OPTIONS_MAP,
  RoleId,
} from './constant'
import { Button } from '@/components/base/buttons/button'
import { ArrowRight } from '@untitledui/icons'
import { useScroll } from '@/hooks/use-scroll'
import { useStepTimer } from '@/hooks/use-step-timer'

export const SignupRoleStep = () => {
  const firstName = useAppSelector(onboardingSelectFirstName)
  const selectedRole = useAppSelector(onboardingSelectRole)
  const [error, setError] = useState('')
  const { getTimeSpent } = useStepTimer()

  const isCustomRole =
    (!!selectedRole && !(selectedRole in ROLE_OPTIONS_MAP)) ||
    selectedRole === 'OTHER'
  const [showRoleSearch, setShowRoleSearch] = useState(isCustomRole)

  const hasSelectedOtherRole = useMemo(() => {
    return (
      selectedRole && OTHER_ROLE_ITEMS.some(item => item.id === selectedRole)
    )
  }, [selectedRole])

  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(onboardingGoToNextStep())
  }

  const onRoleOnClick = (id: RoleId) => () => {
    setError('')
    const isPredefined = id in ROLE_OPTIONS_MAP && id !== RoleId.OTHER

    trackEvent('signup_role_selected', {
      role: id,
      role_category: isPredefined ? 'predefined' : 'other',
      time_spent_on_step: getTimeSpent(),
      is_auto_advanced: isPredefined,
    })

    dispatch(onboardingAppendForm({ role: id }))
    if (id === RoleId.OTHER) {
      trackEvent('signup_role_other_clicked')
      setShowRoleSearch(true)
    } else {
      onNext()
    }
  }
  const roleSearchRef = useRef<HTMLDivElement>(null)
  const prevShowRoleSearch = useRef(showRoleSearch)
  const { scrollToEnd } = useScroll()

  const trackSearchEvent = useCallback(
    (query: string, resultsCount: number) => {
      trackEvent('signup_role_searched', {
        search_query: query,
        results_count: resultsCount,
      })
    },
    [],
  )

  const debouncedTrackSearch = useDebounceFn(trackSearchEvent, 300)

  const scrollToEndEffect = useEffectEvent(() => {
    scrollToEnd()
  })

  useEffect(() => {
    if (!showRoleSearch || prevShowRoleSearch.current) {
      prevShowRoleSearch.current = showRoleSearch
      return
    }
    scrollToEndEffect()
    // Add delay to ensure the scroll is complete
    setTimeout(() => {
      const input = roleSearchRef.current?.querySelector('input')
      if (input) {
        input.focus()
        input.click()
      }
    }, 50)
  }, [showRoleSearch])

  useEnterToSubmit(() => {
    if (showRoleSearch) {
      onNext()
    } else if (selectedRole) {
      onNext()
    }
  }, showRoleSearch || !!selectedRole)

  return (
    <StepContainer
      title="Which best describes your role?"
      topSlot={
        <div className="">
          <p className="text-tertiary text-lg">
            Dear <span className="font-bold">{firstName}</span>,
          </p>
        </div>
      }
      footer={
        (showRoleSearch || !!selectedRole) && (
          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row-reverse lg:justify-start lg:gap-6">
            {hasSelectedOtherRole || !showRoleSearch ? (
              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                className="w-full lg:w-auto"
                isDisabled={!selectedRole}
              >
                Continue
              </Button>
            ) : (
              <div className="flex justify-center py-2 lg:justify-end lg:py-0">
                <Button onClick={onNext} color="link-brand">
                  Skip, and Continue →
                </Button>
              </div>
            )}
          </div>
        )
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {ROLE_OPTION_ITEMS.map(role => (
            <button
              key={role.id}
              onClick={onRoleOnClick(role.id)}
              className={cx(
                'flex h-14 items-center justify-center rounded-lg border p-3 text-center transition-all hover:shadow-sm sm:h-16 sm:p-4',
                selectedRole === role.id ||
                  (role.id === RoleId.OTHER && showRoleSearch)
                  ? 'border-brand-400 selected-item-bg shadow-sm'
                  : 'border-secondary hover:border-primary',
              )}
            >
              <span className="text-primary text-xs font-medium sm:text-sm">
                {role.name}
              </span>
            </button>
          ))}
        </div>

        {showRoleSearch ? (
          <div className="flex flex-col gap-6">
            <Select.ComboBox
              ref={roleSearchRef}
              label="Describe your role"
              placeholder="Type your role..."
              items={OTHER_ROLE_ITEMS}
              selectedKey={selectedRole}
              onOpenChange={open => {
                if (open) {
                  trackEvent('signup_role_search_opened')
                }
              }}
              onSelectionChange={value => {
                if (value) onRoleOnClick(value as RoleId)()
              }}
              onInputChange={value => {
                if (value) {
                  const results = OTHER_ROLE_ITEMS.filter(item =>
                    item.label.toLowerCase().includes(value.toLowerCase()),
                  )
                  debouncedTrackSearch(value, results.length)
                }
              }}
            >
              {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select.ComboBox>
          </div>
        ) : null}

        {error && (
          <p className="text-error-primary text-center text-sm">{error}</p>
        )}
      </div>
    </StepContainer>
  )
}
