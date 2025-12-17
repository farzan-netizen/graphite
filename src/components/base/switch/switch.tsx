'use client'

import { useState, useId } from 'react'
import { cx } from '@/utils/cx'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  brandColor?: string
}

export const Switch = ({
  checked: controlledChecked,
  onChange,
  className,
  brandColor = '#0AC06C',
}: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(false)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked
  const switchId = useId()
  const sliderClass = `slider-${switchId.replace(/:/g, '-')}`

  const handleChange = () => {
    const newValue = !checked
    if (!isControlled) {
      setInternalChecked(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <div
      className={cx('relative inline-block', className)}
      style={{
        verticalAlign: 'bottom',
        marginBottom: '0.15em',
        fontSize: '0.31em',
      }}
    >
      <label className="pointer-events-none relative inline-block h-[2em] w-[3.5em]">
        <input
          id={`switch_${switchId}`}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only"
          readOnly={isControlled}
          disabled
        />
        <span
          className={cx(
            sliderClass,
            'pointer-events-none absolute top-0 right-0 bottom-0 left-0 rounded-[30px] transition-all duration-700',
          )}
          style={{
            backgroundColor: checked ? brandColor : '#000000',
          }}
        >
          <span
            className="absolute bottom-[0.3em] left-[0.3em] h-[1.4em] w-[1.4em] rounded-[20px] bg-white transition-all duration-700"
            style={{
              transform: checked ? 'translateX(1.5em)' : 'translateX(0)',
            }}
          />
        </span>
      </label>
    </div>
  )
}
