interface LoadingOverlayProps {
  isVisible: boolean
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
  if (!isVisible) return null

  return (
    <div className="bg-primary/80 dark:bg-primary/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="border-brand-600 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-primary text-sm">Redirecting...</p>
      </div>
    </div>
  )
}
