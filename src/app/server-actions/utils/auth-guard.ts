import { Errors } from '@/constants/errors'
import { getEmailFromGlobalTokenCookie } from './cookie'
import { err, type ServerActionResult } from '@/utils/server-action-result'

export function authGuard<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => Promise<ServerActionResult<any>>,
>(fn: T): T {
  return (async (...args: Parameters<T>) => {
    const email = await getEmailFromGlobalTokenCookie()
    if (!email) {
      return err(Errors.UNAUTHORIZED_ACCESS) as ReturnType<T>
    }
    return fn(...args)
  }) as T
}
