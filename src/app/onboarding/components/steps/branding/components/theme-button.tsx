import { Image } from '@/components/base/image'

interface ThemeButtonProps {
  theme: 'light' | 'dark'
  isSelected: boolean
  onClick: () => void
}

export const ThemeButton = ({
  theme,
  isSelected,
  onClick,
}: ThemeButtonProps) => {
  const isLight = theme === 'light'

  return (
    <button
      onClick={onClick}
      className="group relative rounded-lg transition-all hover:scale-[1.02]"
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          src={isLight ? '/theme-light-preview.png' : '/theme-dark-preview.png'}
          alt={`${theme} theme preview`}
          className="h-auto w-full"
          width={100}
          height={100}
        />
      </div>
      {isSelected && (
        <div
          className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full shadow-lg ${
            isLight ? 'bg-black' : 'bg-white'
          }`}
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke={isLight ? '#FFFFFF' : '#000000'}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  )
}
