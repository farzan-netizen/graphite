import type { ComponentType, SVGProps } from 'react'

export type PlanId = 'growth' | 'starter' | 'enterprise'
export type BillingPeriod = 'annual' | 'monthly'
export type CtaMode = 'trial' | 'waitlist'

export interface PlanFeature {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  text: string
}

export interface Plan {
  id: string
  name: string
  price: string
  period: string
  annualPrice: string | null
  annualPeriod: string | null
  annualTotal: string
  monthlyTotal: string
  members: string
  collaborators: string
  spaces: string
  storage: string
  description: string
  features: PlanFeature[]
  essentialFeatures: PlanFeature[]
  buttonText: string
  buttonStyle: string
}
