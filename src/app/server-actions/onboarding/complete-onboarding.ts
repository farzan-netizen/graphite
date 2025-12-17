'use server'

import { authGuard } from '../utils/auth-guard'
import {
  setOnboardingStatusCookie,
  getEmailFromGlobalTokenCookie,
} from '../utils/cookie'
import { ok, err, type ServerActionResult } from '@/utils/server-action-result'

export const completeOnboarding = authGuard(
  async (): Promise<ServerActionResult<void>> => {
    const email = await getEmailFromGlobalTokenCookie()
    if (!email) {
      return err('Email not found')
    }
    try {
      await setOnboardingStatusCookie({
        email,
        status: 'completed',
      })
      return ok(undefined)
    } catch {
      return err('Failed to complete onboarding')
    }
  },
)
