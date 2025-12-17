'use client'

import { ArrowLeft } from '@untitledui/icons'
import { ReactNode, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/base/buttons/button'
import { Image } from '@/components/base/image'
import { cx } from '@/utils/cx'
import { ELEMENT_IDS } from '@/constants/element-ids'
import { usePathname } from '@/hooks/use-path-name'
import { onboardingSelectCurrentStep } from '@/store/onboarding'
import { useAppSelector } from '@/hooks/store'

interface Props {
  currentStep?: number
  totalSteps?: number
  hideSteps?: boolean
  hideBack?: boolean
  hideHeader?: boolean
  hideHeaderDesktop?: boolean
  onBack?: () => void
  children?: ReactNode
  rightSideBar?: ReactNode
  contentClassName?: string
  hideProgressBar?: boolean
}
export const PageContainer = ({
  currentStep,
  totalSteps,
  hideSteps,
  hideBack,
  hideHeader,
  hideHeaderDesktop,
  onBack,
  children,
  rightSideBar,
  contentClassName,
  hideProgressBar,
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [needsScroll, setNeedsScroll] = useState(false)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pathname = usePathname()
  const onboardingStep = useAppSelector(onboardingSelectCurrentStep)

  // Reset scroll when path or step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTimeout(() => {
      const pageContainer = scrollContainerRef.current
      if (pageContainer) {
        pageContainer.scrollTo?.({ top: 0, behavior: 'instant' })
      }
    }, 0)
  }, [pathname, onboardingStep])

  useEffect(() => {
    const checkOverflow = () => {
      const element = scrollContainerRef.current
      if (!element) return

      const hasVerticalOverflow = element.scrollHeight > element.clientHeight
      setNeedsScroll(hasVerticalOverflow)
    }

    // Check immediately on mount
    checkOverflow()
    const debouncedCheckOverflow = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      debounceTimeoutRef.current = setTimeout(checkOverflow, 200)
    }

    // Check immediately on mount
    checkOverflow()

    const resizeObserver = new ResizeObserver(debouncedCheckOverflow)
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current)
    }

    window.addEventListener('resize', debouncedCheckOverflow)

    const mutationObserver = new MutationObserver(debouncedCheckOverflow)
    if (scrollContainerRef.current) {
      mutationObserver.observe(scrollContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      })
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', debouncedCheckOverflow)
    }
  }, [children])

  return (
    <section className="bg-primary flex h-dvh overflow-hidden">
      <div className="flex h-full w-full min-w-[320px] grow flex-col overflow-hidden lg:w-1/2">
        {!hideHeader && (
          <header
            className={cx(
              'px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-3.5',
              hideHeaderDesktop && 'lg:hidden',
            )}
          >
            <div className="flex items-center gap-4">
              <Image
                src="/logo-bettermode.svg"
                alt="bettermode"
                className="logo-filter h-5 w-auto"
                width={20}
                height={20}
              />
              {!hideProgressBar && currentStep && totalSteps && (
                <div className="bg-secondary relative h-0.5 flex-1 overflow-visible rounded-full">
                  <div
                    className="bg-brand-600 relative h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                    }}
                  >
                    {!hideSteps && (
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 pl-2 whitespace-nowrap ${
                          currentStep === totalSteps
                            ? 'right-0 translate-x-0'
                            : 'right-0 translate-x-full'
                        }`}
                      >
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-xs leading-none font-medium tracking-tight ${
                            currentStep === totalSteps
                              ? 'bg-brand-600 dark:bg-brand-600 border-brand-600 dark:border-brand-600 border text-white'
                              : 'bg-brand-600/10 dark:bg-brand-600/20 border-brand-600/30 dark:border-brand-600/40 text-brand-600 dark:text-brand-400 border'
                          }`}
                        >
                          <span className="font-bold">{currentStep}</span>/
                          {totalSteps}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {hideProgressBar && !hideSteps && (
                <div className="text-tertiary text-xs leading-none font-medium tracking-tight">
                  {currentStep}/{totalSteps}
                </div>
              )}
            </div>
          </header>
        )}

        <div
          ref={scrollContainerRef}
          id={ELEMENT_IDS.SCROLL_CONTAINER}
          className={cx(
            'scrollbar-thin flex flex-col overflow-x-auto overflow-y-auto',
            needsScroll ? 'grow' : 'lg:grow',
            'px-4 sm:py-8 md:px-6 lg:px-8 xl:py-8',
            hideHeader ? 'pt-3 sm:pt-6' : 'py-3 sm:py-6',
          )}
        >
          <div
            className={cx(
              'mx-auto w-full',
              needsScroll ? 'grow' : 'lg:grow',
              contentClassName,
            )}
          >
            {currentStep && currentStep > 1 && onBack && !hideBack && (
              <div className="mb-5">
                <Button
                  onClick={onBack}
                  color="link-brand"
                  iconLeading={<ArrowLeft className="h-4 w-4" />}
                >
                  Back
                </Button>
              </div>
            )}
            <div>{children}</div>
          </div>
        </div>
        <div
          id={ELEMENT_IDS.STICKY_FOOTER}
          className={cx(
            'bg-primary z-10 px-4 py-3 empty:hidden md:px-6 lg:border-t-0 lg:px-8 lg:py-0',
            needsScroll && 'border-t-primary sticky bottom-0 border-t shadow',
          )}
        />
      </div>

      {rightSideBar}
    </section>
  )
}
