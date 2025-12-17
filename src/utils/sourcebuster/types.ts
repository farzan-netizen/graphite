interface SourceBusterInitOptions {
  // Set custom expiration period for cookies in months
  // 6 months is default
  lifetime?: number

  // Set custom session length in minutes
  // 30 minutes is default
  session_length?: number

  // Set domain name in cookies
  domain?: {
    host: string
    isolate: boolean
  }

  // Set custom referral sources
  referrals?: {
    // This is host from Twitter's `http referer`
    host: string
    // This is custom `utm_medium`, you can drop it and it'll be `referral`
    medium: string
    // And this is how you'll see it in the result data
    display?: string
  }[]

  // Set custom organic sources
  organics?: {
    host: string
    medium: string
    display?: string
  }[]

  // Set `utm_source` & `utm_medium` values for `typein` traffic
  // Defaults are `(direct)` & `(none)`
  typein_attributes?: {
    source?: string
    medium?: string
  }

  // Set time zone
  timezone_offset?: number

  // Set custom `utm_campaign` param
  campaign_param?: string

  // Set user ip
  user_ip?: string

  // Set promocode
  // Default range is [100000..999999]
  promocode?: {
    min: number
    max: number
  }

  // Set callback-function,
  // It will be executed right after `sbjs` cookies will be set
  callback?: () => void
}

export interface SbjsData {
  /**
   * Traffic type. Possible values: `utm, `organic`, `referral`, `typein`
   * @default typein
   */
  typ: string

  /**
   * Source. utm_source, actually.
   * @default (direct)
   */
  src: string

  /**
   * Medium, utm_medium. Values can be customized using utm-params and referrals.
   * @default (none)
   */

  mdm: string
  /**
   * Campaign. Value of utm_campaign.
   * @default (none)
   */
  cmp: string

  /**
   * Content. Value of utm_content.
   * @default (none)
   */
  cnt: string

  /**
   *  Keyword. Value of utm_term.
   * @default (none)
   */
  trm: string
}

export interface Sbjs {
  init: (options?: SourceBusterInitOptions) => void
  get: {
    current: SbjsData
    first: SbjsData
  }
}

declare global {
  interface Window {
    sbjs?: Sbjs
  }
}

export const SOURCEBUSTER_DATA_KEYS = [
  /**
   * Traffic type. Possible values: `utm, `organic`, `referral`, `typein`
   */
  'typ',
  /**
   * Source. utm_source, actually.
   */
  'src',
  /**
   * Medium, utm_medium. Values can be customized using utm-params and referrals.
   */
  'mdm',
  /**
   * Campaign. Value of utm_campaign.
   */
  'cmp',
  /**
   * Content. Value of utm_content.
   */
  'cnt',
  /**
   *  Keyword. Value of utm_term.
   */
  'trm',
] as const

export type TSourcebusterDataKey = (typeof SOURCEBUSTER_DATA_KEYS)[number]

export type TSourcebusterEntryTuple = [TSourcebusterDataKey, string]

export interface BmUtmData {
  bm_utm_campaign: string
  bm_utm_source: string
  bm_utm_medium: string
  bm_utm_content: string
  bm_utm_term: string
  bm_first_utm_campaign: string
  bm_first_utm_source: string
  bm_first_utm_medium: string
  bm_first_utm_content: string
  bm_first_utm_term: string
}

export interface UtmEventProps {
  utm_campaign: string
  utm_source: string
  utm_medium: string
  utm_content: string
  utm_term: string
  utm_campaign_first: string
  utm_source_first: string
  utm_medium_first: string
  utm_content_first: string
  utm_term_first: string
}

export {}
