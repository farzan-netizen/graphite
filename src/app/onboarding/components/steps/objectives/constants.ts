import {
  Target03,
  Heart,
  Rocket01,
  HelpCircle,
  Users01,
  Lightbulb01,
} from '@untitledui/icons'
import type { CSSProperties, FC } from 'react'

export const OBJECTIVE_OPTIONS: Array<{
  id: string
  title: string
  description: string
  icon: FC<{ className?: string; style?: CSSProperties }>
}> = [
  {
    id: 'leads-referrals',
    title: 'Generate High-Quality Leads & Referrals',
    description:
      'Attract prospective customers, educate the market, and encourage advocacy and referrals.',
    icon: Target03,
  },
  {
    id: 'retention-loyalty',
    title: 'Increase Customer Retention & Loyalty',
    description:
      'Build stronger relationships, reduce churn, and foster a sense of belonging among our customer base.',
    icon: Heart,
  },
  {
    id: 'product-adoption',
    title: 'Boost Product Adoption & Success',
    description:
      'Help customers get the most out of our product, increase feature usage, and improve their ROI.',
    icon: Rocket01,
  },
  {
    id: 'support-costs',
    title: 'Scale Customer Support & Reduce Costs',
    description:
      'Enable peer-to-peer support, provide self-service resources, and deflect common support inquiries.',
    icon: HelpCircle,
  },
  {
    id: 'networking',
    title: 'Enable Customer-to-Customer Networking',
    description:
      'Facilitate connections, shared learning, and best-practice discussions among users.',
    icon: Users01,
  },
  {
    id: 'feedback-innovation',
    title: 'Drive Product Feedback & Innovation',
    description:
      'Collect valuable insights, beta test new features, and gather ideas for our product roadmap.',
    icon: Lightbulb01,
  },
]
