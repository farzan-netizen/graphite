import { ReactNode } from 'react'

import { cx } from '@/utils/cx'
import { PageStickyFooter } from './page-sticky-footer'

interface Props {
  children?: ReactNode
  title?: string
  description?: string
  topSlot?: ReactNode
  className?: string
  footer?: ReactNode
}
export const StepContainer = ({
  children,
  title,
  description,
  topSlot,
  className,
  footer,
}: Props) => {
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      {topSlot && <div className="main-content-top-slot">{topSlot}</div>}
      <div className="flex max-w-full flex-col gap-6">
        {(title || description) && (
          <div className="flex flex-col gap-1">
            {title && (
              <h1 className="main-content-title text-display-xs text-primary md:text-display-sm">
                {title}
              </h1>
            )}
            {description && (
              <p className="main-content-description text-md text-tertiary">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-6">{children}</div>
        {footer && <PageStickyFooter>{footer}</PageStickyFooter>}
      </div>
    </div>
  )
}
