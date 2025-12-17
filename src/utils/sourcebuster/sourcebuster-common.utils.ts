import type { Campaign } from '@segment/analytics-core'

import { type BmUtmData, type SbjsData, type UtmEventProps } from './types'

export const SBJS_DATA_DEFAULT: SbjsData = {
  typ: 'typein',
  src: '(direct)',
  cmp: '(none)',
  mdm: '(none)',
  cnt: '(none)',
  trm: '(none)',
}

export function convertSbDataToSegmentCampaign(data: SbjsData): Campaign {
  return {
    name: data.cmp,
    source: data.src,
    medium: data.mdm,
    content: data.cnt,
    term: data.trm,
  }
}

export function convertSbDataToBmUtmParams(params: {
  current: SbjsData | undefined
  first: SbjsData | undefined
}): BmUtmData {
  const { first = SBJS_DATA_DEFAULT, current = SBJS_DATA_DEFAULT } = params
  return {
    bm_utm_campaign: current?.cmp,
    bm_utm_source: current?.src,
    bm_utm_medium: current?.mdm,
    bm_utm_content: current?.cnt,
    bm_utm_term: current?.trm,
    bm_first_utm_campaign: first?.cmp,
    bm_first_utm_source: first?.src,
    bm_first_utm_medium: first?.mdm,
    bm_first_utm_content: first?.cnt,
    bm_first_utm_term: first?.trm,
  }
}

export function convertSbDataToUtmEventProps(params: {
  current: SbjsData
  first: SbjsData
}): UtmEventProps {
  const { first = SBJS_DATA_DEFAULT, current = SBJS_DATA_DEFAULT } = params
  return {
    utm_campaign: current?.cmp,
    utm_source: current?.src,
    utm_medium: current?.mdm,
    utm_content: current?.cnt,
    utm_term: current?.trm,
    utm_campaign_first: first?.cmp,
    utm_source_first: first?.src,
    utm_medium_first: first?.mdm,
    utm_content_first: first?.cnt,
    utm_term_first: first?.trm,
  }
}
