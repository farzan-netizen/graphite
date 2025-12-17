import { cx } from '@/utils/cx'
import { Image } from '@/components/base/image'

const STARTER_LOGOS = [
  '/logos/s/google-analytics-3.svg',
  '/logos/s/cookie-svgrepo-com.svg',
  '/logos/s/zapier.svg',
  '/logos/s/make.svg',
  '/logos/s/slack-new-logo.svg',
  '/logos/s/discord.svg',
  '/logos/s/mailchimp logo.svg',
]

const GROWTH_ENTERPRISE_LOGOS = [
  ...STARTER_LOGOS,
  '/logos/s/google-tag-manager logo.svg',
  '/logos/s/Custom-Code-Snippet.svg',
  '/logos/s/Usercentrics_idibjbvDVZ_0.svg',
  '/logos/s/OneTrust.svg',
  '/logos/s/fullstory-logo.svg',
  '/logos/s/hotjar-icon logo.svg',
  '/logos/s/amplitude-icon logo.svg',
  '/logos/s/Mixpanel_Symbol_0.svg',
  '/logos/s/hubspot-1.svg',
  '/logos/s/zendesk-3.svg',
  '/logos/s/intercom-2.svg',
  '/logos/s/Jira logo.svg',
  '/logos/s/salesforce.svg',
]

interface IntegrationLogosProps {
  planId: string
}

export const IntegrationLogos = ({ planId }: IntegrationLogosProps) => {
  const logos = planId === 'starter' ? STARTER_LOGOS : GROWTH_ENTERPRISE_LOGOS

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {logos.map((logo, index) => (
        <Image
          key={index}
          src={logo}
          alt=""
          className={cx(
            'h-4.5 w-4.5 rounded',
            (logo.includes('cookie-svgrepo-com') ||
              logo.includes('Custom-Code-Snippet')) &&
              'logo-filter',
          )}
          width={16}
          height={16}
        />
      ))}
    </div>
  )
}
