import type { Theme } from '../type'
import { Image } from '@/components/base/image'

interface LogoProps {
  communityName?: string
  currentStep: number
  selectedLogoUrl?: string | null
  primaryColor?: string
  theme: Theme
}

export const Logo = ({
  communityName,
  currentStep,
  selectedLogoUrl,
  primaryColor,
  theme,
}: LogoProps) => (
  <div className="flex items-center gap-2 sm:gap-3">
    {currentStep >= 2 && selectedLogoUrl ? (
      <Image
        key={selectedLogoUrl}
        src={selectedLogoUrl}
        alt="Logo"
        className="h-6 w-6 shrink-0 rounded-lg object-contain sm:h-8 sm:w-8"
        width={24}
        height={24}
      />
    ) : (
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white sm:h-8 sm:w-8 sm:text-sm"
        style={{ backgroundColor: primaryColor || '#6366f1' }}
      >
        <span>
          {currentStep >= 1 && communityName
            ? communityName.charAt(0).toUpperCase()
            : 'C'}
        </span>
      </div>
    )}
    <div className="hidden sm:block">
      <div
        className="truncate text-sm font-semibold"
        style={{ color: theme.text }}
      >
        {currentStep >= 1 && communityName ? communityName : 'Community'}
      </div>
    </div>
  </div>
)
