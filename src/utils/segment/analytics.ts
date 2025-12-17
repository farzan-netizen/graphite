import { AnalyticsBrowser } from '@segment/analytics-next'

import { EnvVariables } from '@/constants/env-variables'
import { getBrowser, getDeviceType, getOS } from '@/utils/device'
import {
  convertSbDataToSegmentCampaign,
  convertSbDataToUtmEventProps,
} from '@/utils/sourcebuster/sourcebuster-common.utils'

import { ENVIRONMENT } from './constants'
import { isServer } from '@/utils/ssr'

const getCommonProperties = () => {
  if (isServer()) {
    return { environment: ENVIRONMENT }
  }

  return {
    // Device & Browser
    device_type: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    // Location
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    // Page Info
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || undefined,
    // Timing
    local_time: new Date().toISOString(),
    // App Version
    app_version: '1.0.0',
    // Environment
    environment: ENVIRONMENT,
  }
}

export const analytics = AnalyticsBrowser.load(
  {
    writeKey: EnvVariables.SEGMENT_WRITE_KEY,
  },
  {
    disable: !EnvVariables.SEGMENT_WRITE_KEY,
  },
)

if (!isServer()) {
  analytics.addSourceMiddleware(({ payload, next }) => {
    const campaigns = window.sbjs?.get
    const commonProps = getCommonProperties()
    const utmProps = campaigns ? convertSbDataToUtmEventProps(campaigns) : {}

    // Add campaign context
    if (campaigns) {
      payload.obj.context = {
        ...payload.obj.context,
        campaign: {
          ...payload.obj.context?.campaign,
          ...convertSbDataToSegmentCampaign(campaigns.current),
        },
      }
    }

    // Add common properties to all events
    if (payload.obj.type === 'identify') {
      payload.obj.traits = {
        ...utmProps,
        ...payload.obj.traits,
      }
    } else if (payload.obj.properties !== undefined) {
      payload.obj.properties = {
        ...commonProps,
        ...utmProps,
        ...payload.obj.properties,
      }
    }

    next(payload)
  })
}

export const trackEvent = async (
  eventName: string,
  properties?: { [key: string]: unknown },
) => {
  try {
    await analytics.track(eventName, {
      ...(properties ?? {}),
    })
  } catch {
    // No-op
  }
}

export const identify: AnalyticsBrowser['identify'] = async (
  id,
  traits,
  options,
  callback,
) =>
  analytics.identify(
    id,
    {
      ...traits,
    },
    options,
    callback,
  )

export const trackPageView = async () => {
  // Generic page event
  try {
    await analytics.page()
  } catch {
    // No-op
  }
}

export const resetAnalytics = async () => {
  await analytics.reset()
}
