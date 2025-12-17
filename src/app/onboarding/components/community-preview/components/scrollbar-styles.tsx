interface ScrollbarStylesProps {
  isDark: boolean
  prefix?: string
}

export const ScrollbarStyles = ({
  isDark,
  prefix = 'preview',
}: ScrollbarStylesProps) => {
  const mode = isDark ? 'dark' : 'light'
  const thumbBg = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
  const thumbHoverBg = isDark
    ? 'rgba(255, 255, 255, 0.25)'
    : 'rgba(0, 0, 0, 0.15)'

  return (
    <style>{`
      .${prefix}-scrollbar-${mode}::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .${prefix}-scrollbar-${mode}::-webkit-scrollbar-track {
        background: transparent;
      }
      .${prefix}-scrollbar-${mode}::-webkit-scrollbar-thumb {
        background: ${thumbBg};
        border-radius: 3px;
        transition: background 0.2s ease;
      }
      .${prefix}-scrollbar-${mode}::-webkit-scrollbar-thumb:hover {
        background: ${thumbHoverBg};
      }
    `}</style>
  )
}

export const getScrollbarStyle = (isDark: boolean) => ({
  scrollbarWidth: 'thin' as const,
  scrollbarColor: isDark
    ? 'rgba(255, 255, 255, 0.15) transparent'
    : 'rgba(0, 0, 0, 0.1) transparent',
})

export const getScrollbarClassName = (isDark: boolean, prefix = 'preview') =>
  `${prefix}-scrollbar-${isDark ? 'dark' : 'light'}`
