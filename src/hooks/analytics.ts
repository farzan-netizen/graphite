import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { identify, trackPageView } from '@/utils/segment/analytics'
import { getSegmentIdentifyAuthMember } from '@/app/server-actions/analytics'
import {
  onboardingSelectEmail,
  onboardingSelectForm,
  onboardingSelectEnterpriseFeatures,
  onboardingSelectBillingPeriod,
} from '@/store/onboarding'

import { useSearchParams } from './use-search-params'
import { useAppSelector } from './store'

/**
 * Hook to identify users in Segment
 * Automatically fetches user data from the server if authenticated
 */
export const useSegmentIdentify = () => {
  const maybeEmail = useAppSelector(onboardingSelectEmail)

  useEffect(() => {
    const fetchAndIdentify = async () => {
      const result = await getSegmentIdentifyAuthMember()
      if (result.success) {
        const { name, email, createdAt } = result.data

        if (email) {
          identify(email, {
            name,
            email,
            createdAt: createdAt as string,
          })
        }
      } else if (maybeEmail) {
        identify(maybeEmail, {
          email: maybeEmail,
        })
      }
    }
    fetchAndIdentify()
  }, [maybeEmail])
}

const IDENTIFY_DEBOUNCE_MS = 500

/**
 * Hook to identify user with onboarding form data for Salesforce/Mixpanel sync
 * Listens to Redux store and identifies whenever form data changes (debounced)
 */
export const useSegmentIdentifyOnboarding = () => {
  const formData = useAppSelector(onboardingSelectForm)
  const enterpriseFeatures = useAppSelector(onboardingSelectEnterpriseFeatures)
  const billingPeriod = useAppSelector(onboardingSelectBillingPeriod)
  const prevFormRef = useRef<string>('')
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!formData?.email) return

    const traits = {
      email: formData.email,
      ...(formData.firstName && { firstName: formData.firstName }),
      ...(formData.lastName && { lastName: formData.lastName }),
      ...(formData.industry && { industry: formData.industry }),
      ...(formData.role && { role: formData.role }),
      ...(formData.integrations?.length && {
        integrations: formData.integrations,
      }),
      ...(enterpriseFeatures?.length && { enterpriseFeatures }),
      ...(formData.communityName && { communityName: formData.communityName }),
      ...(formData.existingCommunityName && {
        existingCommunityUrl: formData.existingCommunityName,
      }),
      ...(formData.objectives?.length && { objectives: formData.objectives }),
      ...(formData.websiteUrl && { websiteUrl: formData.websiteUrl }),
      ...(formData.logoUrl && { logoUrl: formData.logoUrl }),
      ...(formData.primaryColor && { primaryColor: formData.primaryColor }),
      ...(formData.previewTheme && { previewTheme: formData.previewTheme }),
      ...(formData.spaces?.length && { spaces: formData.spaces }),
      ...(billingPeriod && { billingPeriod }),
      ...(formData.selectedPlan && { selectedPlan: formData.selectedPlan }),
    }

    const traitsKey = JSON.stringify(traits)
    if (traitsKey === prevFormRef.current) return

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      prevFormRef.current = traitsKey
      identify(formData.email, traits)
    }, IDENTIFY_DEBOUNCE_MS)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [formData, enterpriseFeatures, billingPeriod])
}

/**
 * Hook to track page views in Segment
 * Automatically tracks on route changes
 */
export const useSegmentTrackPageView = () => {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      trackPageView()
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [searchParams, pathName])
}
