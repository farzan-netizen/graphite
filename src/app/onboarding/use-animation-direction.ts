import { startTransition, useEffect, useRef, useState } from 'react'

export const useAnimationDirection = ({
  currentStep,
}: {
  currentStep: number
}) => {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const prevStepRef = useRef(currentStep)

  useEffect(() => {
    if (prevStepRef.current !== currentStep) {
      const newDirection =
        prevStepRef.current < currentStep ? 'forward' : 'backward'
      startTransition(() => {
        setDirection(newDirection)
      })
      prevStepRef.current = currentStep
    }
  }, [currentStep])
  return direction
}
