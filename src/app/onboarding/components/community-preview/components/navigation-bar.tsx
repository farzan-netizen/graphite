import type { Theme } from '../type'
import { Logo } from './logo'
import { SearchBox } from './search-box'
import { UserActions } from './user-actions'

interface NavigationBarProps {
  communityName?: string
  currentStep: number
  selectedLogoUrl?: string | null
  primaryColor?: string
  theme: Theme
  isDark?: boolean
}

export const NavigationBar = ({
  communityName,
  currentStep,
  selectedLogoUrl,
  primaryColor,
  theme,
  isDark,
}: NavigationBarProps) => (
  <div
    className="flex shrink-0 items-center gap-3 border-b px-3 py-2 sm:gap-4 sm:px-4 sm:py-3"
    style={{ backgroundColor: theme.bg, borderColor: theme.border }}
  >
    <Logo
      communityName={communityName}
      currentStep={currentStep}
      selectedLogoUrl={selectedLogoUrl}
      primaryColor={primaryColor}
      theme={theme}
    />
    <SearchBox theme={theme} />
    <UserActions theme={theme} isDark={isDark} />
  </div>
)
