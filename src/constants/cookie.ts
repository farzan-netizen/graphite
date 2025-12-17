export enum CookieKeys {
  /**
   * This cookie has to have the same value as the one in the tribe-neo/dev-portal repo.
   *
   * For more information on `__Host-` cookie prefix, see:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#cookie_prefixes
   */
  GlobalToken = '__Host-globalToken',
  UnsecureGlobalToken = 'globalToken',
  CelloReferral = 'cello-referral',
  OnboardingStatus = 'onboarding-status',
}
