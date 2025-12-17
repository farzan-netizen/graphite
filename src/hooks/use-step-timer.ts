import { useRef, useCallback } from 'react'

export const useStepTimer = () => {
  const startTimeRef = useRef<number | null>(null)

  if (startTimeRef.current === null) {
    // eslint-disable-next-line react-hooks/purity
    startTimeRef.current = Date.now()
  }

  const getTimeSpent = useCallback(() => {
    return Math.round(
      (Date.now() - (startTimeRef.current ?? Date.now())) / 1000,
    )
  }, [])

  return { getTimeSpent }
}
