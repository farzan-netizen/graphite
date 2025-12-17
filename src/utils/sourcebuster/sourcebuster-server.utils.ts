import 'server-only'

import { cookies } from 'next/headers'

import { SBJS_DATA_DEFAULT } from '@/utils/sourcebuster/sourcebuster-common.utils'

import {
  type SbjsData,
  SOURCEBUSTER_DATA_KEYS,
  type TSourcebusterDataKey,
  type TSourcebusterEntryTuple,
} from './types'

const DELIMITER = '|||'

export async function extractSbDataFromCookies(): Promise<{
  current: SbjsData
  first: SbjsData
}> {
  const cookieStore = await cookies()
  const lastTouchCookieValue = cookieStore.get('sbjs_current')?.value
  const firstTouchCookieValue = cookieStore.get('sbjs_first')?.value
  const current = decodeSbCookieValue(lastTouchCookieValue)
  const first = decodeSbCookieValue(firstTouchCookieValue)
  return {
    current,
    first,
  }
}

function decodeSbCookieValue(cookiesValue: string | undefined): SbjsData {
  if (!cookiesValue) {
    return SBJS_DATA_DEFAULT
  }

  /**
   * encodedData sample value: `typ=referral|||src=sample.com|||mdm=referral|||cmp=(none)|||cnt=/|||trm=(none)`
   */
  const stringEncodedData = decodeURIComponent(cookiesValue)
  const stringEncodedParams = stringEncodedData.split(DELIMITER)

  const dataEntries = stringEncodedParams
    .map<TSourcebusterEntryTuple | null>(param => {
      const [key, value] = param.split('=')
      if (isValidSourcebusterEntry(key)) {
        return [key, value]
      }
      return null
    })
    .filter<TSourcebusterEntryTuple>(entry => !!entry)

  if (dataEntries.length === 0) {
    return SBJS_DATA_DEFAULT
  }

  const sbData = Object.fromEntries(dataEntries) as unknown as SbjsData
  return { ...SBJS_DATA_DEFAULT, ...sbData }
}

function isValidSourcebusterEntry(key: string): key is TSourcebusterDataKey {
  return !!key && SOURCEBUSTER_DATA_KEYS.includes(key as TSourcebusterDataKey)
}
