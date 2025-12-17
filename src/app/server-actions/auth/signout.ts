'use server'

import { redirect } from 'next/navigation'
import {
  deleteGlobalTokenCookie,
  setOnboardingStatusCookie,
} from '../utils/cookie'
import { RoutePaths } from '@/constants/routes'
import { Errors } from '@/constants/errors'
import { logger } from '@/utils/server/logger'
import { err, type ServerActionResult } from '@/utils/server-action-result'

export const signout = async (): Promise<ServerActionResult<never> | void> => {
  try {
    await deleteGlobalTokenCookie()
    await setOnboardingStatusCookie({
      email: '',
      status: 'pending',
    })
  } catch (error) {
    logger.error('Error signing out', { error })
    return err(Errors.SOMETHING_WENT_WRONG)
  }
  redirect(RoutePaths.SIGNIN)
}
