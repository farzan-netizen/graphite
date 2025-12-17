import { useCallback, useRef } from 'react'

export const useDebounceFn = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number = 300,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )

  return debouncedFn
}

