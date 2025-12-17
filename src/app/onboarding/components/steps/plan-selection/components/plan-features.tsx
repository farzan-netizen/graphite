import { cx } from '@/utils/cx'
import type { ComponentType } from 'react'

interface Feature {
  icon: ComponentType<{ className?: string }>
  text: string
}

interface PlanFeaturesProps {
  features: Feature[]
  variant?: 'compact' | 'full'
  maxHeight?: string
}

export const PlanFeatures = ({
  features,
  variant = 'full',
  maxHeight,
}: PlanFeaturesProps) => {
  const isCompact = variant === 'compact'

  return (
    <div
      className={cx(
        'overflow-hidden',
        isCompact ? 'space-y-0.5' : 'space-y-1',
        maxHeight,
      )}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className={cx(
            'text-tertiary flex items-center',
            isCompact ? 'text-[0.7rem]' : 'text-xs',
          )}
        >
          <feature.icon
            className={cx(
              'text-quaternary shrink-0',
              isCompact ? 'mr-1.5 h-2.5 w-2.5' : 'mr-2 h-3 w-3',
            )}
          />
          <span className="flex-1 leading-tight">{feature.text}</span>
        </div>
      ))}
    </div>
  )
}
