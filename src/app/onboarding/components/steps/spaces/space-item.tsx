import { Check } from '@untitledui/icons'

import { cx } from '@/utils/cx'

import type { SpaceOption } from '../../types'

interface Props {
  onClick: (id: SpaceOption['id']) => void
  space: SpaceOption
  isSelected?: boolean
}
export const SpaceItem = ({ onClick, space, isSelected }: Props) => {
  const { id, name, icon: Icon } = space
  const handleOnClick = () => {
    onClick(id)
  }
  return (
    <button
      onClick={handleOnClick}
      className={cx(
        'flex h-12 w-full items-center gap-3 rounded-lg border p-3 text-left transition-all hover:shadow-sm',
        isSelected
          ? 'bg-brand-primary_alt border-brand-400 shadow-sm'
          : 'bg-primary border-tertiary hover:border-secondary hover:bg-secondary',
      )}
    >
      <Icon className="text-brand-secondary h-5 w-5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="text-primary truncate text-sm font-medium">
            {name}
          </span>
          {isSelected && (
            <Check className="h-3.5 w-3.5" style={{ color: '#0AC06C' }} />
          )}
        </div>
      </div>
    </button>
  )
}
