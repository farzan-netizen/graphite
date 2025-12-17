import { useEffect, useEffectEvent } from 'react'

export const useEnterToSubmit = (
  onSubmit: () => void,
  isEnabled: boolean = true,
) => {
  const onSubmitEffect = useEffectEvent(() => {
    onSubmit()
  })
  useEffect(() => {
    if (!isEnabled) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger on Enter key (not Shift+Enter)
      if (event.key !== 'Enter' || event.shiftKey) return

      const target = event.target as HTMLElement

      // Don't trigger if user is typing in a textarea (multi-line input)
      // or contenteditable element
      const isTextarea = target.tagName === 'TEXTAREA'
      const isContentEditable = target.isContentEditable

      if (isTextarea || isContentEditable) return

      // For input fields, allow Enter to submit (this is standard form behavior)
      // But prevent default to avoid any unwanted form submissions
      event.preventDefault()
      onSubmitEffect()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isEnabled])
}
