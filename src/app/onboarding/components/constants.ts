import {
  AlertCircle,
  Calendar,
  File01,
  HelpCircle,
  Lightbulb01,
  MessageChatCircle,
  Rocket01,
  Rss01,
  Users01,
  Users03,
} from '@untitledui/icons'
import type { SpaceOption } from './types'

export enum SaasToolId {
  GOOGLE_ANALYTICS = 'google-analytics',
  ZAPIER = 'zapier',
  MAKE = 'make',
  SLACK = 'slack',
  DISCORD = 'discord',
  MAILCHIMP = 'mailchimp',
  GOOGLE_TAG_MANAGER = 'google-tag-manager',
  USERCENTRICS = 'usercentric',
  JIRA = 'jira',
  CUSTOM_CODE = 'custom-code',
  ONETRUST = 'onetrust',
  FULLSTORY = 'fullstory',
  HOTJAR = 'hotjar',
  AMPLITUDE = 'amplitude',
  MIXPANEL = 'mixpanel',
  HUBSPOT = 'hubspot',
  ZENDESK = 'zendesk',
  INTERCOM = 'intercom',
  SALESFORCE = 'salesforce',
}

interface SaasTool {
  id: SaasToolId
  name: string
  logo: string
  description: string
  isEnterprise?: boolean
}

export const SAAS_TOOLS_MAP: Record<SaasToolId, SaasTool> = {
  [SaasToolId.GOOGLE_ANALYTICS]: {
    id: SaasToolId.GOOGLE_ANALYTICS,
    name: 'Google Analytics',
    logo: '/logos/s/google-analytics-3.svg',
    description:
      'Track website traffic and user behavior with detailed analytics and insights.',
  },
  [SaasToolId.ZAPIER]: {
    id: SaasToolId.ZAPIER,
    name: 'Zapier',
    logo: '/logos/s/zapier.svg',
    description:
      'Automate workflows by connecting your apps and services together.',
  },
  [SaasToolId.MAKE]: {
    id: SaasToolId.MAKE,
    name: 'Make.com',
    logo: '/logos/s/make.svg',
    description:
      'Build powerful automation workflows with visual scenario builder.',
  },
  [SaasToolId.SLACK]: {
    id: SaasToolId.SLACK,
    name: 'Slack',
    logo: '/logos/s/slack-new-logo.svg',
    description:
      "Send notifications and updates directly to your team's Slack channels.",
  },
  [SaasToolId.DISCORD]: {
    id: SaasToolId.DISCORD,
    name: 'Discord',
    logo: '/logos/s/discord.svg',
    description:
      'Connect with your gaming and developer communities on Discord.',
  },
  [SaasToolId.MAILCHIMP]: {
    id: SaasToolId.MAILCHIMP,
    name: 'Mailchimp',
    logo: '/logos/s/mailchimp logo.svg',
    description:
      'Sync member data and send targeted email marketing campaigns.',
  },
  [SaasToolId.GOOGLE_TAG_MANAGER]: {
    id: SaasToolId.GOOGLE_TAG_MANAGER,
    name: 'Google Tag Manager',
    logo: '/logos/s/google-tag-manager logo.svg',
    description:
      'Manage tracking codes and marketing tags without touching code.',
    isEnterprise: true,
  },
  [SaasToolId.USERCENTRICS]: {
    id: SaasToolId.USERCENTRICS,
    name: 'Usercentrics',
    logo: '/logos/s/Usercentrics_idibjbvDVZ_0.svg',
    description:
      'Advanced consent management platform for GDPR and privacy compliance.',
    isEnterprise: true,
  },
  [SaasToolId.JIRA]: {
    id: SaasToolId.JIRA,
    name: 'Jira',
    logo: '/logos/s/Jira logo.svg',
    description:
      'Create issues and sync project management with community feedback.',
    isEnterprise: true,
  },
  [SaasToolId.CUSTOM_CODE]: {
    id: SaasToolId.CUSTOM_CODE,
    name: 'Custom Code Snippet',
    logo: '/logos/s/Custom-Code-Snippet.svg',
    description:
      'Add custom HTML, CSS, and JavaScript to enhance your community.',
    isEnterprise: true,
  },
  [SaasToolId.ONETRUST]: {
    id: SaasToolId.ONETRUST,
    name: 'OneTrust',
    logo: '/logos/s/OneTrust.svg',
    description: 'Enterprise privacy management and cookie consent solution.',
    isEnterprise: true,
  },
  [SaasToolId.FULLSTORY]: {
    id: SaasToolId.FULLSTORY,
    name: 'Fullstory',
    logo: '/logos/s/fullstory-logo.svg',
    description: 'Capture complete user sessions and analyze user experience.',
    isEnterprise: true,
  },
  [SaasToolId.HOTJAR]: {
    id: SaasToolId.HOTJAR,
    name: 'Hotjar',
    logo: '/logos/s/hotjar-icon logo.svg',
    description:
      'Understand user behavior with heatmaps, recordings, and feedback.',
    isEnterprise: true,
  },
  [SaasToolId.AMPLITUDE]: {
    id: SaasToolId.AMPLITUDE,
    name: 'Amplitude',
    logo: '/logos/s/amplitude-icon logo.svg',
    description:
      'Advanced product analytics to understand user journeys and retention.',
    isEnterprise: true,
  },
  [SaasToolId.MIXPANEL]: {
    id: SaasToolId.MIXPANEL,
    name: 'Mixpanel',
    logo: '/logos/s/Mixpanel_Symbol_0.svg',
    description: 'Event-based analytics to track user actions and engagement.',
    isEnterprise: true,
  },
  [SaasToolId.HUBSPOT]: {
    id: SaasToolId.HUBSPOT,
    name: 'Hubspot',
    logo: '/logos/s/hubspot-1.svg',
    description:
      'Sync contacts and leads with your CRM and marketing automation.',
    isEnterprise: true,
  },
  [SaasToolId.ZENDESK]: {
    id: SaasToolId.ZENDESK,
    name: 'Zendesk',
    logo: '/logos/s/zendesk-3.svg',
    description:
      'Create support tickets and manage customer service workflows.',
    isEnterprise: true,
  },
  [SaasToolId.INTERCOM]: {
    id: SaasToolId.INTERCOM,
    name: 'Intercom',
    logo: '/logos/s/intercom-2.svg',
    description:
      'Connect customer conversations and support with your community.',
    isEnterprise: true,
  },
  [SaasToolId.SALESFORCE]: {
    id: SaasToolId.SALESFORCE,
    name: 'Salesforce',
    logo: '/logos/s/salesforce.svg',
    description:
      'Integrate customer data and sales processes with your community.',
    isEnterprise: true,
  },
}

export const SAAS_TOOLS_ITEMS: SaasTool[] = Object.values(SAAS_TOOLS_MAP)

export const SPACE_OPTIONS: SpaceOption[] = [
  {
    id: 'discussion',
    name: 'Discussion',
    description: 'Discussions and conversations',
    icon: MessageChatCircle,
  },
  {
    id: 'qa',
    name: 'Q&A',
    description: 'Questions and answers',
    icon: HelpCircle,
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Events and meetups',
    icon: Calendar,
  },
  {
    id: 'feedback',
    name: 'Feedback & Ideas',
    description: 'Feedback and feature requests',
    icon: Lightbulb01,
  },
  {
    id: 'blog',
    name: 'Blog / Articles',
    description: 'Articles and long-form content',
    icon: File01,
  },
  {
    id: 'groups',
    name: 'Groups',
    description: 'Community groups',
    icon: Users01,
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Important updates and news',
    icon: AlertCircle,
  },
  {
    id: 'product-updates',
    name: 'Product Updates',
    description: 'Latest product news',
    icon: Rocket01,
  },
  {
    id: 'member-directory',
    name: 'Member Directory',
    description: 'Browse community members',
    icon: Users03,
  },
  {
    id: 'feed',
    name: 'Feed',
    description: 'Activity feed',
    icon: Rss01,
  },
]
