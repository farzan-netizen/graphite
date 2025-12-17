import { Image } from '@/components/base/image'

interface TestimonialData {
  quote: string
  name: string
  role: string
  avatar: string
  logoSrc: string
  logoAlt: string
  logoWidth: number
  logoHeight: number
  logoClassName: string
}

const testimonials: Record<number, TestimonialData> = {
  2: {
    quote:
      'Using Bettermode has been a game-changer for us. Its powerful capabilities and features have revolutionized the way we engage with our community, leading to more effective connections and experiences.',
    name: 'Kyle Foster',
    role: 'Marketing Manager at ',
    avatar: '/assets/sidebar/kyle-foster.png',
    logoSrc: '/assets/sidebar/hubspot-logo.svg',
    logoAlt: 'HubSpot logo',
    logoWidth: 55,
    logoHeight: 16,
    logoClassName:
      'h-[16px] w-[54.945px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  3: {
    quote:
      "Our experience with Bettermode has been fantastic—it's become an essential part of how we support and engage our users, and we're excited to see it evolve further with our community.",
    name: 'Lizbeth Ramos',
    role: 'Developer Community Manager',
    avatar: '/assets/sidebar/lizbeth-ramos.png',
    logoSrc: '/logos/l_backup/xano.svg',
    logoAlt: 'Xano logo',
    logoWidth: 60,
    logoHeight: 14,
    logoClassName:
      'h-[14px] w-[59.684px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
}

interface TestimonialCardProps {
  step: number
}

export const TestimonialCard = ({ step }: TestimonialCardProps) => {
  const testimonial = testimonials[step] || testimonials[2]

  return (
    <div className="w-[436px] rounded-[20px] border border-[#e7e7e7] bg-white p-[20px] dark:border-[#353535] dark:bg-[#2a2a2a]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex h-[32px] w-[32px] rotate-180 items-center justify-center">
          <Image
            src="/assets/sidebar/quote-icon.svg"
            alt="Quote icon"
            className="h-[16px] w-[20px] dark:brightness-0 dark:invert"
            width={20}
            height={16}
          />
        </div>

        <div className="flex flex-col gap-[16px]">
          <p className="text-[16px] leading-normal font-normal text-black dark:text-white">
            {testimonial.quote}
          </p>

          <div className="flex items-center gap-[8px]">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              className="h-[44px] w-[44px] rounded-full"
              width={44}
              height={44}
            />
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] leading-normal font-semibold text-black dark:text-white">
                {testimonial.name}
              </p>
              <div className="flex items-center gap-[8px]">
                <p className="text-[10.89px] font-light text-black dark:text-[#929292]">
                  {testimonial.role}
                </p>
                <Image
                  src={testimonial.logoSrc}
                  alt={testimonial.logoAlt}
                  className={testimonial.logoClassName}
                  width={testimonial.logoWidth}
                  height={testimonial.logoHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
