import { Image } from '@/components/base/image'
import type { BrandState } from '@/store/brand'

interface DetectedBrandCardProps {
  brand: BrandState
  onDiscard: () => void
  onChangeUrl: () => void
}

export const DetectedBrandCard = ({
  brand,
  onDiscard,
  onChangeUrl,
}: DetectedBrandCardProps) => {
  const logoSrc = brand.logos?.[0]?.formats?.[0]?.src

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-primary text-sm font-medium">
          Detected branding
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onDiscard}
            className="text-brand-secondary hover:text-brand-secondary_hover text-xs underline underline-offset-1"
          >
            Discard
          </button>
          <button
            onClick={onChangeUrl}
            className="text-brand-secondary hover:text-brand-secondary_hover text-xs underline underline-offset-1"
          >
            Change URL
          </button>
        </div>
      </div>
      <div className="bg-primary border-tertiary flex items-center gap-2.5 rounded-lg border p-2.5">
        {logoSrc && (
          <Image
            src={logoSrc}
            alt={brand.name || 'Brand logo'}
            className="h-8 w-8 object-contain"
            width={32}
            height={32}
          />
        )}
        <div>
          <div className="text-primary text-sm font-medium">{brand.name}</div>
          <div className="text-tertiary text-xs">{brand.domain}</div>
        </div>
      </div>
    </div>
  )
}
