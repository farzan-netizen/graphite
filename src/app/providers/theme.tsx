'use client'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { DARK_MODE_CLASS } from '@/constants/theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    // Function to apply the theme
    const applyTheme = (isDark: boolean) => {
      const root = window.document.documentElement
      root.classList.toggle(DARK_MODE_CLASS, isDark)
    }

    // Determine current theme (manual override or system)
    const getCurrentTheme = () => {
      if (manualTheme) {
        return manualTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    applyTheme(getCurrentTheme())

    // Listen for system theme changes (only if no manual override)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (!manualTheme) {
        applyTheme(mediaQuery.matches)
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)

    // Keyboard shortcut for testing: F1 to toggle theme
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F1') {
        event.preventDefault()
        setManualTheme(prev => {
          const currentIsDark = prev === 'dark' || (!prev && mediaQuery.matches)
          const newTheme = currentIsDark ? 'light' : 'dark'
          applyTheme(newTheme === 'dark')
          return newTheme
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [manualTheme])

  return children
}
