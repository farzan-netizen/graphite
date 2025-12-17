import 'server-only'

import {
  Analytics,
  type IdentifyParams,
  type TrackParams,
} from '@segment/analytics-node'
import type { Callback } from '@segment/analytics-node/dist/types/app/dispatch-emit'

import { EnvVariables } from '@/constants/env-variables'
import { logger } from '@/utils/server/logger'
import {
  convertSbDataToSegmentCampaign,
  convertSbDataToUtmEventProps,
} from '@/utils/sourcebuster/sourcebuster-common.utils'
import { extractSbDataFromCookies } from '@/utils/sourcebuster/sourcebuster-server.utils'

import { ENVIRONMENT } from './constants'

const analytics = new Analytics({
  writeKey: EnvVariables.SEGMENT_WRITE_KEY,
})

/**
 * Identify a user on the server side with Segment
 * Automatically extracts UTM parameters from sourcebuster cookies
 */
export const serverIdentify = async (params: IdentifyParams, cb?: Callback) => {
  try {
    const campaigns = await extractSbDataFromCookies()
    const utmProps = convertSbDataToUtmEventProps(campaigns)

    analytics.identify(
      {
        ...params,
        traits: {
          ...utmProps,
          ...params.traits,
        },
        context: {
          ...params?.context,
          campaign: {
            ...params?.context?.campaign,
            ...convertSbDataToSegmentCampaign(campaigns.current),
          },
        },
      },
      cb,
    )
  } catch (err) {
    logger.error(err)
  }
}

/**
 * Track an analytics event on the server side
 * Automatically extracts UTM parameters from sourcebuster cookies
 */
export const serverTrack = async (
  eventName: string,
  properties: Record<string, unknown>,
  options: { userId: string } | { anonymousId: string },
) => {
  try {
    const campaigns = await extractSbDataFromCookies()
    const utmProps = convertSbDataToUtmEventProps(campaigns)

    analytics.track({
      event: eventName,
      ...options,
      properties: {
        environment: ENVIRONMENT,
        ...utmProps,
        ...properties,
      },
      context: {
        campaign: {
          ...convertSbDataToSegmentCampaign(campaigns.current),
        },
      },
    })
  } catch (err) {
    logger.error(err)
  }
}

/**
 * Track an event on the server side with Segment (legacy version)
 */
export const serverTrackEvent = async (params: TrackParams, cb?: Callback) => {
  try {
    const campaigns = await extractSbDataFromCookies()
    const utmProps = convertSbDataToUtmEventProps(campaigns)

    analytics.track(
      {
        ...params,
        properties: {
          environment: ENVIRONMENT,
          ...utmProps,
          ...params.properties,
        },
        context: {
          ...params?.context,
          campaign: {
            ...params?.context?.campaign,
            ...convertSbDataToSegmentCampaign(campaigns.current),
          },
        },
      },
      cb,
    )
  } catch (err) {
    logger.error(err)
  }
}
