'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { appSelectToastMessages, appRemoveToastMessage } from '@/store/app'
import { cx } from '@/utils/cx'

export const ToastContainer = () => {
  const toasts = useAppSelector(appSelectToastMessages)
  const dispatch = useAppDispatch()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(appRemoveToastMessage(toast.id))}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  message: string
  type: 'error' | 'warning' | 'info'
  onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000) // Auto-close after 5 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cx(
        'max-w-md min-w-[300px] rounded-lg border p-4 shadow-lg transition-all',
        type === 'error' &&
          'bg-error-primary/10 border-error-primary/30 text-error-primary',
        type === 'warning' &&
          'border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        type === 'info' &&
          'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className={cx(
            'text-tertiary hover:text-primary text-xs',
            type === 'error' &&
              'text-error-primary hover:text-error-primary/80',
          )}
        >
          ×
        </button>
      </div>
    </div>
  )
}
