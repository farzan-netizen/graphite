import { forwardRef } from 'react'
import { InputBase } from '@/components/base/input/input'
import { InputGroup } from '@/components/base/input/input-group'
import { Button } from '@/components/base/buttons/button'
import { Download01 } from '@untitledui/icons'
import { isValidWebsiteUrl } from '../utils'

interface UrlInputFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  isInvalid?: boolean
  buttonLabel: string
  showCancel?: boolean
  onCancel?: () => void
}

export const UrlInputForm = forwardRef<HTMLInputElement, UrlInputFormProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      onKeyDown,
      onFocus,
      onBlur,
      isInvalid,
      buttonLabel,
      showCancel,
      onCancel,
    },
    ref,
  ) => {
    const isDisabled = !value.trim() || !isValidWebsiteUrl(value)

    return (
      <div className="space-y-2">
        {showCancel && onCancel && (
          <div className="flex items-center justify-between">
            <span className="text-primary text-sm font-medium">
              Auto-detect branding
            </span>
            <button
              onClick={onCancel}
              className="text-tertiary hover:text-tertiary_hover text-xs underline underline-offset-1"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <InputGroup
            className="flex-1"
            leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
            value={value}
            onChange={onChange}
          >
            <InputBase
              ref={ref}
              placeholder="acme.com"
              className="text-sm"
              isInvalid={isInvalid}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </InputGroup>
          <Button
            size="sm"
            color="secondary"
            onClick={onSubmit}
            isDisabled={isDisabled}
            iconLeading={Download01}
            className="whitespace-nowrap"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    )
  },
)

UrlInputForm.displayName = 'UrlInputForm'
