import { trackEvent } from '@/utils/segment/analytics'

interface SeeDetailsLinkProps {
  planId?: string
  planName?: string
  onClick?: (e: React.MouseEvent) => void
}

export const SeeDetailsLink = ({
  planId,
  planName,
  onClick,
}: SeeDetailsLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    trackEvent('wizard_see_details_clicked', {
      plan_id: planId,
      plan_name: planName,
    })
    onClick?.(e)
  }

  return (
    <div className="border-tertiary/30 border-t pt-4">
      <a
        href="https://bettermode.com/pricing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-quaternary hover:text-tertiary block text-center text-xs transition-colors"
        onClick={handleClick}
      >
        See details →
      </a>
    </div>
  )
}
