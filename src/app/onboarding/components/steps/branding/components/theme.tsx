import { useAppDispatch } from '@/hooks/store'
import { onboardingAppendForm, type OnboardingState } from '@/store/onboarding'
import { ThemeButton } from './theme-button'
import { trackEvent } from '@/utils/segment/analytics'

interface Props {
  previewTheme: OnboardingState['form']['previewTheme']
}

export const WizardBrandingStepTheme = ({ previewTheme }: Props) => {
  const dispatch = useAppDispatch()

  const handleThemeChange = (theme: 'light' | 'dark') => {
    trackEvent('wizard_theme_toggled', {
      new_theme: theme,
      previous_theme: previewTheme || 'light',
    })
    dispatch(onboardingAppendForm({ previewTheme: theme }))
  }

  return (
    <div className="bg-primary border-secondary flex h-full flex-col rounded-lg border p-3">
      <h3 className="text-primary mb-2 text-sm font-medium">Preview theme</h3>
      <div className="flex flex-1 items-center">
        <div className="grid w-full grid-cols-2 gap-2">
          <ThemeButton
            theme="light"
            isSelected={previewTheme === 'light'}
            onClick={() => handleThemeChange('light')}
          />
          <ThemeButton
            theme="dark"
            isSelected={previewTheme === 'dark'}
            onClick={() => handleThemeChange('dark')}
          />
        </div>
      </div>
    </div>
  )
}
