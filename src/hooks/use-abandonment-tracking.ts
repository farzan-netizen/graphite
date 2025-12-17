import { useEffect, useRef, useCallback } from 'react'
import { trackEvent } from '@/utils/segment/analytics'

interface AbandonmentParams {
  stepName: string
  stepNumber: number
  isWizard: boolean
  completedStepsCount: number
}

export const useAbandonmentTracking = ({
  stepName,
  stepNumber,
  isWizard,
  completedStepsCount,
}: AbandonmentParams) => {
  const startTimeRef = useRef<number | null>(null)
  const dataRef = useRef({
    stepName,
    stepNumber,
    isWizard,
    completedStepsCount,
  })

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now()
    }
  }, [])

  useEffect(() => {
    dataRef.current = { stepName, stepNumber, isWizard, completedStepsCount }
  }, [stepName, stepNumber, isWizard, completedStepsCount])

  const trackAbandonment = useCallback(() => {
    const data = dataRef.current
    const start = startTimeRef.current
    if (!start) return

    const eventName = data.isWizard ? 'wizard_abandoned' : 'signup_abandoned'
    const timeSpent = Math.round((Date.now() - start) / 1000)

    trackEvent(eventName, {
      last_step_name: data.stepName,
      last_step_number: data.stepNumber,
      ...(data.isWizard
        ? {
            time_spent_in_wizard: timeSpent,
            completed_wizard_steps_count: data.completedStepsCount,
            was_migration_flow: false,
          }
        : {
            time_spent_total: timeSpent,
            completed_steps_count: data.completedStepsCount,
            exit_method: 'browser_close',
          }),
    })
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      trackAbandonment()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackAbandonment()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackAbandonment])
}
