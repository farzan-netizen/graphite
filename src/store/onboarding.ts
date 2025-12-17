import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducersName } from './constants'
import { RootState } from '.'

export interface OnboardingState {
  currentStep: number
  form: {
    email?: string
    firstName?: string
    lastName?: string
    role?: string
    industry?: string
    integrations?: string[]
    enterpriseFeatures?: string[]
    objectives?: string[]
    existingCommunityName?: string
    communityName?: string
    websiteUrl?: string
    logoUrl?: string | null
    primaryColor?: string
    spaces?: string[]
    billingPeriod?: 'annual' | 'monthly'
    previewTheme: 'light' | 'dark'
    selectedPlan?: string
  }
}

const initialState: OnboardingState = {
  currentStep: 1,
  form: {
    previewTheme: 'light',
    billingPeriod: 'annual',
  },
}

const onboardingSlice = createSlice({
  name: ReducersName.Onboarding,
  initialState,
  reducers: {
    onboardingSetCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    onboardingGoToNextStep: state => {
      state.currentStep += 1
    },
    onboardingGoToPrevStep: state => {
      if (state.currentStep > 1) state.currentStep -= 1
    },
    onboardingAppendForm: (
      state,
      action: PayloadAction<Partial<OnboardingState['form']>>,
    ) => {
      state.form = { ...state.form, ...action.payload }
    },
    onboardingReset: () => {
      return initialState
    },
  },
})

export const {
  onboardingSetCurrentStep,
  onboardingGoToNextStep,
  onboardingGoToPrevStep,
  onboardingAppendForm,
  onboardingReset,
} = onboardingSlice.actions

export const onboardingReducer = onboardingSlice.reducer

const onboardingSelectState = (state: RootState) =>
  state[ReducersName.Onboarding]

export const onboardingSelectForm = (state: RootState) =>
  onboardingSelectState(state).form

export const onboardingSelectCurrentStep = createSelector(
  [onboardingSelectState],
  state => state.currentStep,
)

export const onboardingSelectEmail = createSelector(
  [onboardingSelectForm],
  form => form.email,
)

export const onboardingSelectFirstName = createSelector(
  [onboardingSelectForm],
  form => form.firstName,
)

export const onboardingSelectLastName = createSelector(
  [onboardingSelectForm],
  form => form.lastName,
)

export const onboardingSelectIndustry = createSelector(
  [onboardingSelectForm],
  form => form.industry,
)

export const onboardingSelectRole = createSelector(
  [onboardingSelectForm],
  form => form.role,
)

export const onboardingSelectIntegrations = createSelector(
  [onboardingSelectForm],
  form => form.integrations,
)

export const onboardingSelectEnterpriseFeatures = createSelector(
  [onboardingSelectForm],
  form => form.enterpriseFeatures,
)

export const onboardingSelectCommunityName = createSelector(
  [onboardingSelectForm],
  form => form.communityName,
)

export const onboardingSelectExistingCommunityName = createSelector(
  [onboardingSelectForm],
  form => form.existingCommunityName,
)

export const onboardingSelectSpaces = createSelector(
  [onboardingSelectForm],
  form => form.spaces || [],
)

export const onboardingSelectPrimaryColor = createSelector(
  [onboardingSelectForm],
  form => form.primaryColor,
)

export const onboardingSelectBillingPeriod = createSelector(
  [onboardingSelectForm],
  form => form.billingPeriod,
)

export const onboardingSelectPreviewTheme = createSelector(
  [onboardingSelectForm],
  form => form.previewTheme,
)

export const onboardingSelectWebsiteUrl = createSelector(
  [onboardingSelectForm],
  form => form.websiteUrl,
)

export const onboardingSelectLogoUrl = createSelector(
  [onboardingSelectForm],
  form => form.logoUrl,
)

export const onboardingSelectObjectives = createSelector(
  [onboardingSelectForm],
  form => form.objectives,
)
