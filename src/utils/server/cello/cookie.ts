import 'server-only'

import { CookieKeys } from '@/constants/cookie'
import { cookies } from 'next/headers'

export const getReferrerCode = async (): Promise<string | undefined> => {
  const cookieStore = await cookies()
  // This cookie is being set by Cello attribution script
  // We do not use window.CelloAttribution("getReferral") because it is not available on server side
  // Therefore, we need to read the cookie directly
  const referrerCode = cookieStore.get(CookieKeys.CelloReferral)
  return referrerCode?.value
}
