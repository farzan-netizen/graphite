import { Loading01 } from '@untitledui/icons'
import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

export const Loading = ({
  children,
  isLoading,
}: {
  children?: ReactNode
  isLoading?: boolean
}) => {
  return (
    <div className={cx('relative', isLoading && 'cursor-progress')}>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-none">
          <Loading01 className="text-brand-secondary h-4 w-4 animate-spin" />
        </div>
      )}
      <div
        className={cx(
          'opacity-100',
          isLoading ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {children}
      </div>
    </div>
  )
}
