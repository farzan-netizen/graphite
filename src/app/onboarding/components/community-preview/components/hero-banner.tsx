import type { Theme } from '../type'

interface Props {
  currentStep: number
  primaryColor?: string
  communityName?: string
  theme: Theme
}

export const CommunityPreviewHeroBanner = ({
  currentStep,
  primaryColor,
  communityName,
  theme,
}: Props) => {
  const accentColor = primaryColor || '#6366f1'
  const accentBg15 = `${accentColor}15`
  const accentBg08 = `${accentColor}08`

  return (
    <div
      className="relative mb-4 overflow-hidden rounded-lg p-4 sm:mb-6 sm:p-5"
      style={{
        background: `linear-gradient(135deg, ${accentBg15} 0%, ${accentBg08} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${accentColor} 2px, transparent 0), radial-gradient(circle at 75px 75px, ${accentColor} 2px, transparent 0)`,
          backgroundSize: '100px 100px',
        }}
      />
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="h-2 w-16 rounded"
            style={{ backgroundColor: accentBg15 }}
          />
        </div>

        <h1
          className="mb-2 text-lg font-bold sm:text-xl"
          style={{ color: theme.text }}
        >
          {currentStep >= 1 && communityName ? (
            <>
              Welcome to{' '}
              <span
                className="bg-linear-to-r bg-clip-text font-extrabold text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
                }}
              >
                {communityName}
              </span>
            </>
          ) : (
            'Build Something Amazing Together'
          )}
        </h1>

        <div className="max-w-xl space-y-2">
          <div
            className="h-3 w-full rounded"
            style={{ backgroundColor: accentBg15 }}
          />
          <div
            className="h-3 w-4/5 rounded"
            style={{ backgroundColor: accentBg15 }}
          />
          <div
            className="h-3 w-3/5 rounded"
            style={{ backgroundColor: accentBg15 }}
          />
        </div>

        <div className="mt-4">
          <div
            className="h-7 w-20 rounded-md shadow-sm"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    </div>
  )
}
