import type { OnboardingState } from '@/store/onboarding'
import type { BrandState } from '@/store/brand'
import {
  SAAS_TOOLS_MAP,
  type SaasToolId,
} from '@/app/onboarding/components/constants'
import {
  INDUSTRIES_MAPPING,
  IndustryId,
  OTHER_INDUSTRIES_MAPPING,
} from '@/app/onboarding/components/steps/industry/constants'
import {
  Users01,
  Database01,
  Globe01,
  TrendUp01,
  Star01,
  Mail01,
  Lock01,
  Headphones01,
  CheckCircle,
  Zap,
  Shield01,
  Code01,
  Settings01,
  User01,
  CreditCard01,
} from '@untitledui/icons'
import type { CtaMode } from './types'

enum PlanId {
  Starter = 'starter',
  Growth = 'growth',
  Enterprise = 'enterprise',
}

interface GetPlansOptionsParams {
  excludeGrowth?: boolean
  ctaMode?: CtaMode
}

export const getPlansOptions = ({
  excludeGrowth = false,
  ctaMode = 'trial',
}: GetPlansOptionsParams = {}) => {
  const starterButtonText =
    ctaMode === 'waitlist' ? 'Join waitlist' : '14-days trial'
  const growthButtonText =
    ctaMode === 'waitlist' ? 'Join waitlist' : '14-day trial'
  const enterpriseIncludesText = excludeGrowth
    ? 'Everything in Starter'
    : 'Everything in Growth'

  const plans = [
    {
      id: PlanId.Starter,
      name: 'Starter',
      price: '$399',
      period: '/month',
      annualPrice: '$333',
      annualPeriod: '/month',
      annualTotal: '($4,000/year)',
      monthlyTotal: '($4,788/year)',
      members: '10,000',
      collaborators: '3',
      spaces: '100',
      storage: '1TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 10,000 members and 3 collaborators' },
        { icon: Database01, text: '100 spaces and 1TB storage' },
        { icon: Globe01, text: 'Custom Domain' },
        { icon: TrendUp01, text: 'Basic Analytics' },
        { icon: Star01, text: 'Core apps: Q&A, Discussion, Events, Polls' },
        { icon: Mail01, text: 'Private messaging & chat' },
        { icon: Lock01, text: 'Social login' },
        { icon: Headphones01, text: 'Chat & Email Support' },
      ],
      essentialFeatures: [
        { icon: Users01, text: '10K members, 3 collaborators' },
        { icon: Database01, text: '100 spaces, 1TB' },
        { icon: Star01, text: 'Q&A, Discussion, Events, Polls' },
      ],
      buttonText: starterButtonText,
      buttonStyle: 'primary',
    },
    {
      id: PlanId.Growth,
      name: 'Growth',
      price: '$1,750',
      period: '/month',
      annualPrice: '$1,500',
      annualPeriod: '/month',
      annualTotal: '($18,000/year)',
      monthlyTotal: '($21,000/year)',
      members: '25,000',
      collaborators: '10',
      spaces: '200',
      storage: '3TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 25,000 members and 10 collaborators' },
        { icon: Database01, text: '200 spaces and 3TB storage' },
        { icon: CheckCircle, text: 'Everything in Starter' },
        { icon: Zap, text: 'Ask AI and Federated search' },
        { icon: Shield01, text: "Remove 'Powered by Bettermode'" },
        { icon: Mail01, text: 'Sender email customization' },
        { icon: Code01, text: 'API, Webhooks, and Sandbox Environment' },
        { icon: Settings01, text: 'Activity Log' },
        { icon: Headphones01, text: 'Onboarding and Migration Support' },
        { icon: Lock01, text: 'OAuth2' },
      ],
      essentialFeatures: [
        { icon: Users01, text: '25K members, 10 collaborators' },
        { icon: Database01, text: '200 spaces, 3TB' },
        { icon: Zap, text: 'AI search' },
        { icon: Shield01, text: 'Remove branding' },
      ],
      buttonText: growthButtonText,
      buttonStyle: 'primary',
    },
    {
      id: PlanId.Enterprise,
      name: 'Enterprise',
      price: 'Contact Us',
      period: '',
      annualPrice: null,
      annualPeriod: null,
      annualTotal: '',
      monthlyTotal: 'Contact Us',
      members: '50,000',
      collaborators: '20',
      spaces: '500',
      storage: '5TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 50,000 members and 20 collaborators' },
        { icon: Database01, text: '500 spaces and 5TB storage' },
        { icon: CheckCircle, text: enterpriseIncludesText },
        { icon: Settings01, text: 'Audit log (90 days)' },
        { icon: Shield01, text: 'SOC II, JWT, and SAML' },
        { icon: User01, text: 'Customer Success Manager' },
        { icon: TrendUp01, text: '99.9% Uptime SLA' },
        { icon: CreditCard01, text: 'Custom billing' },
        { icon: Lock01, text: 'Security and legal review' },
      ],
      essentialFeatures: [
        { icon: Users01, text: '50K members, 20 collaborators' },
        { icon: Database01, text: '500 spaces, 5TB' },
        { icon: Shield01, text: 'SOC II, SAML' },
        { icon: User01, text: 'Dedicated CSM' },
      ],
      buttonText: 'Talk to Sales',
      buttonStyle: 'primary',
    },
  ]

  // Filter out Growth plan if excluded
  if (excludeGrowth) {
    return plans.filter(plan => plan.id !== PlanId.Growth)
  }

  return plans
}

export const getRecommendedPlan = (
  formData: OnboardingState['form'],
  excludeGrowth: boolean,
): string => {
  const hasEnterpriseFeatures =
    formData &&
    formData.enterpriseFeatures &&
    formData.enterpriseFeatures?.length > 0
  if (hasEnterpriseFeatures) {
    return 'enterprise'
  }

  const hasAdvancedIntegrations = formData.integrations?.some(
    tool => SAAS_TOOLS_MAP[tool as SaasToolId]?.isEnterprise,
  )
  if (hasAdvancedIntegrations) {
    if (excludeGrowth) {
      return 'enterprise'
    }
    return 'growth'
  }

  return 'starter'
}

export const generatePlanRecommendationText = (
  formData: OnboardingState['form'],
  recommendedPlan: string,
  brandData?: BrandState | null,
) => {
  const name = formData.firstName

  // Use brand data if available, otherwise fall back to form data
  const company = brandData?.name || 'your company'

  // Get industry using simplified Step 4 terms
  let industry = 'Technology and Services'

  if (formData.industry) {
    industry =
      INDUSTRIES_MAPPING[formData.industry as keyof typeof INDUSTRIES_MAPPING]
        ?.name ||
      OTHER_INDUSTRIES_MAPPING[
        formData.industry as keyof typeof OTHER_INDUSTRIES_MAPPING
      ]?.name ||
      'Technology and Services'
  } else if (brandData?.company?.industries?.[0]?.name) {
    // Map brand data industry back to our simplified terms
    const brandIndustryName = brandData.company.industries[0].name.toLowerCase()

    if (
      brandIndustryName.includes('programming') ||
      brandIndustryName.includes('developer') ||
      brandIndustryName.includes('software')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.COMPUTER_SOFTWARE].name
    } else if (
      brandIndustryName.includes('artificial intelligence') ||
      brandIndustryName.includes('machine learning')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.AI].name
    } else if (
      brandIndustryName.includes('health') ||
      brandIndustryName.includes('medical') ||
      brandIndustryName.includes('medicine')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.MEDICAL_SAAS].name
    } else if (
      brandIndustryName.includes('marketing') ||
      brandIndustryName.includes('advertising')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.MAR_TECH].name
    } else if (
      brandIndustryName.includes('education') ||
      brandIndustryName.includes('learning')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.ED_TECH].name
    } else if (
      brandIndustryName.includes('marketplace') ||
      brandIndustryName.includes('e-commerce') ||
      brandIndustryName.includes('shopping')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.ONLINE_MARKETPLACE].name
    } else if (
      brandIndustryName.includes('computer') ||
      brandIndustryName.includes('technology') ||
      brandIndustryName.includes('electronics')
    ) {
      industry = INDUSTRIES_MAPPING[IndustryId.TECHNOLOGY_AND_SERVICES].name
    } else {
      industry = INDUSTRIES_MAPPING[IndustryId.B2B_SAAS].name
    }
  }

  // Estimate company size based on brand data
  const companySize = brandData?.company?.employees
    ? brandData.company.employees.toString()
    : '50'

  // Generate integration icons text based on current tools - using exact SAAS_TOOLS data
  let integrationIconsText = ''
  if (typeof window !== 'undefined') {
    console.log(
      'generatePlanRecommendationText - enterpriseFeatures:',
      formData.enterpriseFeatures,
    )
  }
  if (formData.enterpriseFeatures && formData.enterpriseFeatures.length > 0) {
    if (formData.enterpriseFeatures.length === 1) {
      // 1 app: show icon + name
      const toolId = formData.enterpriseFeatures[0]
      const tool = SAAS_TOOLS_MAP[toolId as SaasToolId]
      if (tool) {
        integrationIconsText = `[avatar:${tool.logo}:${tool.name}] ${tool.name}`
      } else {
        integrationIconsText = toolId
      }
    } else if (formData.enterpriseFeatures.length <= 5) {
      // 2-5 apps: show only icons
      const toolAvatars = formData.enterpriseFeatures
        .map(toolId => {
          const tool = SAAS_TOOLS_MAP[toolId as SaasToolId]
          return tool ? `[avatar:${tool.logo}:${tool.name}]` : ''
        })
        .filter(Boolean)
        .join('')
      integrationIconsText = toolAvatars || 'your current tools'
    } else {
      // More than 5 apps: show 5 icons + "and more"
      const toolAvatars = formData.enterpriseFeatures
        .slice(0, 5)
        .map(toolId => {
          const tool = SAAS_TOOLS_MAP[toolId as SaasToolId]
          return tool ? `[avatar:${tool.logo}:${tool.name}]` : ''
        })
        .filter(Boolean)
        .join('')
      integrationIconsText = toolAvatars
        ? `${toolAvatars} and more`
        : 'your current tools'
    }
    if (typeof window !== 'undefined') {
      console.log('integrationIconsText generated:', integrationIconsText)
    }
  } else {
    integrationIconsText = 'your current tools'
  }

  // Plan-specific templates with original UI formatting and 2x larger first line
  const templates = {
    starter: `##**Ready to transform customer connections, ${name}?**\n\nYour **${industry.toLowerCase()}** company is perfectly positioned for community success. With **${company}**'s **${companySize}-person** team and ${integrationIconsText} already in place, the {{Starter}} plan accelerates your community launch.\n\nTurn customer interactions into lasting relationships while your organization builds momentum for bigger wins ahead.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,

    growth: `##**Time to amplify your ${industry.toLowerCase()} leadership, ${name}.**\n\n**${company}** is ready to unlock serious community ROI. Your **${companySize}-person** team, combined with ${integrationIconsText}, positions you perfectly for the {{Growth}} plan's advanced capabilities.\n\nTransform scattered touchpoints into systematic advocacy that drives measurable revenue growth and competitive advantage.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,

    enterprise: `##**Scale with enterprise confidence, ${name}.**\n\n**${company}** deserves community infrastructure that matches your ambitions. With your **${companySize}-person** organization using ${integrationIconsText}, the {{Enterprise}} plan delivers the security and scale you need.\n\nLead your **${industry.toLowerCase()}** with community strategies that enterprise customers trust and competitors can't match.\n\n[[Mo Malayeri]]\n((CEO at Bettermode))`,
  }

  return (
    templates[recommendedPlan.toLowerCase() as keyof typeof templates] ||
    templates.starter
  )
}

export const generatePlanRecommendationTextMobile = (
  formData: OnboardingState['form'],
  recommendedPlan: string,
  brandData?: BrandState | null,
) => {
  const name = formData.firstName
  const company = brandData?.name || 'your company'

  // Mobile-optimized shorter templates - split into title, body text and signature
  const templatesMobile = {
    starter: {
      title: `##**Ready to transform customer connections, ${name}?**`,
      bodyText: `Your **${company}** team is perfectly positioned for community success. The {{Starter}} plan accelerates your launch.`,
      signature: `[[Mo Malayeri]]\n((CEO at Bettermode))`,
    },
    growth: {
      title: `##**Time to amplify your leadership, ${name}.**`,
      bodyText: `**${company}** is ready to unlock serious community ROI. The {{Growth}} plan's advanced capabilities drive measurable growth.`,
      signature: `[[Mo Malayeri]]\n((CEO at Bettermode))`,
    },
    enterprise: {
      title: `##**Scale with enterprise confidence, ${name}.**`,
      bodyText: `**${company}** deserves community infrastructure that matches your ambitions. The {{Enterprise}} plan delivers the security and scale you need.`,
      signature: `[[Mo Malayeri]]\n((CEO at Bettermode))`,
    },
  }

  return (
    templatesMobile[
      recommendedPlan.toLowerCase() as keyof typeof templatesMobile
    ] || templatesMobile.starter
  )
}
