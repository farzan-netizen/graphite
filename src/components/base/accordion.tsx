import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '@/utils/cx'
interface AccordionProps {
  isExpanded: boolean
  header: ReactNode
  collapsedContent: ReactNode
  expandedContent: ReactNode
  className?: string
}

export const Accordion = ({
  isExpanded,
  header,
  collapsedContent,
  expandedContent,
  className,
}: AccordionProps) => {
  const collapsedRef = useRef(null)
  const expandedRef = useRef(null)

  // State to store the pre-measured heights. Starts as 'auto' for initial measurement.
  const [heights, setHeights] = useState({
    collapsed: 'auto',
    expanded: 'auto',
  })

  // Effect to measure heights on initial render (mount)
  useEffect(() => {
    // Only measure if refs exist and heights haven't been set yet
    if (
      collapsedRef.current &&
      expandedRef.current &&
      heights.collapsed === 'auto'
    ) {
      // Measure scrollHeight (exact required pixel height, including padding) for both blocks
      setHeights({
        // @ts-expect-error - scrollHeight is not typed
        collapsed: `${collapsedRef.current.scrollHeight}px`,
        // @ts-expect-error - scrollHeight is not typed
        expanded: `${expandedRef.current.scrollHeight}px`,
      })
    }
  }, [heights]) // Dependency on heights ensures it runs once when needed

  // Determine the target height based on the current state and measured values
  // This value is a precise pixel string (e.g., '150px' or '600px')
  const targetHeight = isExpanded ? heights.expanded : heights.collapsed

  // The outer wrapper's height is determined by the targetHeight
  const dynamicHeightStyle = {
    height: targetHeight,
  }

  return (
    <div className={cx('w-full', className)}>
      {/* The header is now the clickable element and handles the toggle */}
      {header}

      {/* Collapsible Content Area - Animates height using React state and pre-measured values */}
      <div
        style={dynamicHeightStyle}
        // Use the measured pixel height for a smooth transition
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
      >
        {/*
          Inner container: This container's height is set by the outer style.height.
          The content blocks inside are always ABSOLUTE (inset-0) to prevent positional flashing 
          and ensure they cross-fade perfectly at the same coordinates.
        */}
        <div className="relative">
          {/* Collapsed Content Block: Always absolute inset-0. Fades opacity. */}
          <div
            ref={collapsedRef} // Ref attached for initial measurement
            className={`absolute inset-0 text-gray-600 transition-opacity duration-500 ease-in-out md:p-6 ${
              isExpanded
                ? 'pointer-events-none opacity-0' // Inactive: Transparent
                : 'opacity-100' // Active: Opaque
            } `}
          >
            {collapsedContent}
          </div>

          {/* Expanded Content Block: Always absolute inset-0. Fades opacity. */}
          <div
            ref={expandedRef} // Ref attached for initial measurement
            className={`absolute inset-0 space-y-3 text-gray-700 transition-opacity duration-500 ease-in-out md:p-6 ${
              isExpanded
                ? 'opacity-100' // Active: Opaque
                : 'pointer-events-none opacity-0' // Inactive: Transparent
            } `}
          >
            {expandedContent}
          </div>
        </div>
      </div>
    </div>
  )
}
