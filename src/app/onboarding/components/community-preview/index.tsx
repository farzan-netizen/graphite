import { useAppSelector } from '@/hooks/store'
import {
  onboardingSelectCommunityName,
  onboardingSelectCurrentStep,
  onboardingSelectLogoUrl,
  onboardingSelectPreviewTheme,
  onboardingSelectPrimaryColor,
  onboardingSelectSpaces,
} from '@/store/onboarding'
import { CommunityPreviewSidebar } from './components/sidebar'
import { CommunityPreviewHeroBanner } from './components/hero-banner'
import { CommunityPreviewContent } from './components/content'
import type { Theme } from './type'
import { appSelectIsDarkMode } from '@/store/app'
import {
  ScrollbarStyles,
  getScrollbarStyle,
  getScrollbarClassName,
} from './components/scrollbar-styles'
import { BrowserBar } from './components/browser-bar'
import { NavigationBar } from './components/navigation-bar'

export const CommunityPreview = () => {
  const currentStep = useAppSelector(onboardingSelectCurrentStep)
  const communityName = useAppSelector(onboardingSelectCommunityName)
  const primaryColor = useAppSelector(onboardingSelectPrimaryColor)
  const selectedSpaces = useAppSelector(onboardingSelectSpaces)
  const previewTheme = useAppSelector(onboardingSelectPreviewTheme)
  const selectedLogoUrl = useAppSelector(onboardingSelectLogoUrl)
  const isGlobalDarkMode = useAppSelector(appSelectIsDarkMode)

  // Community steps start at 6, use preview theme after first community step
  const isDark = currentStep > 7 ? previewTheme === 'dark' : isGlobalDarkMode

  const theme: Theme = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    bgSecondary: isDark ? '#2a2a2a' : '#f9fafb',
    border: isDark ? '#404040' : '#e5e7eb',
    text: isDark ? '#e5e5e5' : '#111827',
    textSecondary: isDark ? '#a3a3a3' : '#6b7280',
    textTertiary: isDark ? '#737373' : '#9ca3af',
    inputBg: isDark ? '#333333' : '#f9fafb',
    cardBg: isDark ? '#262626' : '#ffffff',
  }

  return (
    <>
      <ScrollbarStyles isDark={isDark} />
      <div className="flex h-full w-full items-stretch justify-center p-2 sm:p-4 lg:p-6">
        <div
          className="border-secondary flex h-full min-h-[400px] w-full flex-col overflow-hidden rounded-xl border shadow-lg"
          style={{ backgroundColor: theme.bg }}
        >
          <div>
            <BrowserBar communityName={communityName} theme={theme} />
            <NavigationBar
              communityName={communityName}
              currentStep={currentStep}
              selectedLogoUrl={selectedLogoUrl}
              primaryColor={primaryColor}
              theme={theme}
              isDark={isDark}
            />
          </div>

          <div className="flex min-h-0 flex-1">
            <CommunityPreviewSidebar
              currentStep={currentStep}
              primaryColor={primaryColor}
              selectedSpaces={selectedSpaces}
              theme={theme}
              isDark={isDark}
            />

            <div
              className={`${getScrollbarClassName(isDark)} min-w-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6`}
              style={getScrollbarStyle(isDark)}
            >
              <CommunityPreviewHeroBanner
                currentStep={currentStep}
                primaryColor={primaryColor}
                communityName={communityName}
                theme={theme}
              />

              <CommunityPreviewContent
                primaryColor={primaryColor}
                theme={theme}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
