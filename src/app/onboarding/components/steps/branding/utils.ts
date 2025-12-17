import type { BrandState } from '@/store/brand'

const isVeryDarkColor = (hex: string): boolean => {
  if (!hex) return false

  // Remove # if present
  const color = hex.replace('#', '')

  if (color.length !== 6) return false

  try {
    // Convert to RGB
    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)

    // Calculate brightness using luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Only consider very dark colors (brightness < 80) - very conservative threshold
    // This catches truly dark colors like black, dark grays, dark blues, etc.
    return brightness < 80
  } catch {
    return false
  }
}

export const isWebsiteDark = (brandData: BrandState): boolean => {
  // Primary check: Look for explicit dark theme in logos (most reliable)
  if (brandData.logos && Array.isArray(brandData.logos)) {
    const hasDarkLogo = brandData.logos.some(
      logo =>
        logo.theme === 'dark' ||
        logo.theme === 'Dark' ||
        logo.theme === 'DARK' ||
        (typeof logo.theme === 'string' && logo.theme.toLowerCase() === 'dark'),
    )
    if (hasDarkLogo) {
      return true
    }
  }

  // Secondary check: Only if no logo theme info available, check colors
  // But be very conservative - only set dark if primary color is VERY dark
  if (
    brandData.colors &&
    Array.isArray(brandData.colors) &&
    brandData.colors.length > 0
  ) {
    const primaryColor = brandData.colors[0]
    const colorHex =
      typeof primaryColor === 'object' && primaryColor.hex
        ? primaryColor.hex
        : typeof primaryColor === 'string'
          ? primaryColor
          : null

    // Only consider it dark if the primary color is very dark (near black)
    if (colorHex && isVeryDarkColor(colorHex)) {
      return true
    }
  }

  return false
}

export const isValidWebsiteUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false
  }

  const trimmedUrl = url.trim()
  if (!trimmedUrl) {
    return false
  }

  try {
    // Normalize the URL by adding protocol if missing
    let urlToValidate = trimmedUrl
    if (
      !trimmedUrl.startsWith('http://') &&
      !trimmedUrl.startsWith('https://')
    ) {
      urlToValidate = `https://${trimmedUrl}`
    }

    const urlObj = new URL(urlToValidate)

    // Must be http or https protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }

    // Extract hostname (remove www. prefix for validation)
    const hostname = urlObj.hostname.replace(/^www\./, '')

    // Validate domain structure: must have at least domain.tld
    // Domain should contain at least one dot (for TLD)
    const domainParts = hostname.split('.')
    if (domainParts.length < 2) {
      return false
    }

    // Each part should be non-empty and valid
    for (const part of domainParts) {
      if (!part || part.length === 0) {
        return false
      }
      // Domain parts should only contain alphanumeric characters and hyphens
      // and not start/end with hyphens
      if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(part)) {
        return false
      }
    }

    // TLD should be at least 2 characters
    const tld = domainParts[domainParts.length - 1]
    if (tld.length < 2) {
      return false
    }

    return true
  } catch {
    // If URL parsing fails, try to validate as domain-only string
    const domainPattern = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
    return domainPattern.test(trimmedUrl)
  }
}
