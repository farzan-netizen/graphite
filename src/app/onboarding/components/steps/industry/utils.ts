import { INDUSTRIES_ITEMS, INDUSTRIES_MAPPING } from './constants'

export const findMatchingIndustry = (brandIndustryName: string) => {
  const lowerBrandName = brandIndustryName.toLowerCase()

  const directMatch = INDUSTRIES_ITEMS.find(
    industry =>
      industry.name.toLowerCase().includes(lowerBrandName) ||
      lowerBrandName.includes(industry.name.toLowerCase()),
  )

  if (directMatch) {
    return directMatch
  }

  if (
    lowerBrandName.includes('programming') ||
    lowerBrandName.includes('developer') ||
    lowerBrandName.includes('software')
  ) {
    return INDUSTRIES_MAPPING.COMPUTER_SOFTWARE
  }
  if (
    lowerBrandName.includes('computer') ||
    lowerBrandName.includes('technology') ||
    lowerBrandName.includes('electronics')
  ) {
    return INDUSTRIES_MAPPING.TECHNOLOGY_AND_SERVICES
  }
  if (
    lowerBrandName.includes('artificial intelligence') ||
    lowerBrandName.includes('machine learning') ||
    lowerBrandName.includes('ai')
  ) {
    return INDUSTRIES_MAPPING.AI
  }
  if (
    lowerBrandName.includes('health') ||
    lowerBrandName.includes('medical') ||
    lowerBrandName.includes('medicine')
  ) {
    return INDUSTRIES_MAPPING.MEDICAL_SAAS
  }
  if (
    lowerBrandName.includes('marketing') ||
    lowerBrandName.includes('advertising')
  ) {
    return INDUSTRIES_MAPPING.MAR_TECH
  }
  if (
    lowerBrandName.includes('education') ||
    lowerBrandName.includes('learning')
  ) {
    return INDUSTRIES_MAPPING.ED_TECH
  }
  if (
    lowerBrandName.includes('marketplace') ||
    lowerBrandName.includes('e-commerce') ||
    lowerBrandName.includes('shopping')
  ) {
    return INDUSTRIES_MAPPING.ONLINE_MARKETPLACE
  }

  return null
}
