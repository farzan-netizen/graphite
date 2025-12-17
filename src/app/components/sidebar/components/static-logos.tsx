import { Image } from '@/components/base/image'

interface LogoConfig {
  src: string
  alt: string
  width: number
  height: number
  className: string
}

const column1Logos: (LogoConfig | { type: 'wakingup' })[] = [
  {
    src: '/assets/sidebar/ibm-static.svg',
    alt: 'IBM',
    width: 37,
    height: 15,
    className:
      'h-[14.878px] w-[37.008px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/assets/sidebar/samsung-static.svg',
    alt: 'Samsung',
    width: 72,
    height: 11,
    className:
      'h-[11.158px] w-[72.317px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  { type: 'wakingup' },
  {
    src: '/logos/l_backup/xano.svg',
    alt: 'Xano',
    width: 73,
    height: 17,
    className:
      'h-[17.018px] w-[72.564px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
]

const column2Logos: LogoConfig[] = [
  {
    src: '/assets/sidebar/hubspot-static.svg',
    alt: 'HubSpot',
    width: 57,
    height: 17,
    className:
      'h-[16.737px] w-[57.477px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/logos/l_backup/lenovo.svg',
    alt: 'Lenovo',
    width: 81,
    height: 17,
    className:
      'h-[17.018px] w-[80.58px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/assets/sidebar/intercom-static.svg',
    alt: 'Intercom',
    width: 81,
    height: 20,
    className:
      'h-[20.457px] w-[80.569px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/assets/sidebar/bosch-static.svg',
    alt: 'Bosch',
    width: 70,
    height: 15,
    className:
      'h-[14.878px] w-[69.652px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
]

const column3Logos: LogoConfig[] = [
  {
    src: '/assets/sidebar/logitech-static.svg',
    alt: 'Logitech',
    width: 61,
    height: 22,
    className:
      'h-[22.317px] w-[61.301px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/assets/sidebar/flutterflow-static.svg',
    alt: 'FlutterFlow',
    width: 101,
    height: 19,
    className:
      'h-[18.597px] w-[101.322px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
  {
    src: '/assets/sidebar/salesforce.svg',
    alt: 'Salesforce',
    width: 74,
    height: 17,
    className:
      'h-[16.737px] w-[73.759px] dark:opacity-70 dark:brightness-0 dark:invert',
  },
]

const LogoCell = ({ logo }: { logo: LogoConfig | { type: 'wakingup' } }) => {
  if ('type' in logo && logo.type === 'wakingup') {
    return (
      <div className="flex h-[33.475px] w-full flex-col items-center justify-center gap-[4.649px] px-[7.439px] py-[5.579px]">
        <div className="relative h-[16.737px] w-[89.615px]">
          <Image
            src="/assets/sidebar/waking-up-static.svg"
            alt="Waking Up"
            className="absolute top-0 left-0 h-[16.737px] w-[16.737px] dark:opacity-70 dark:brightness-0 dark:invert"
            width={17}
            height={17}
          />
          <p
            className="absolute top-[0.7px] left-[16.74px] text-[13.25px] font-semibold tracking-[-0.3975px] whitespace-nowrap text-[#3195ff] dark:text-white"
            style={{ fontFamily: 'Inter' }}
          >
            WAKING UP
          </p>
        </div>
      </div>
    )
  }

  const imageLogo = logo as LogoConfig

  return (
    <div className="flex h-[33.475px] flex-col items-center justify-center gap-[4.649px] px-[7.439px] py-[5.579px]">
      <Image
        src={imageLogo.src}
        alt={imageLogo.alt}
        className={imageLogo.className}
        width={imageLogo.width}
        height={imageLogo.height}
      />
    </div>
  )
}

export const StaticLogos = () => {
  return (
    <div className="flex h-full items-center justify-center gap-6 p-5">
      <div className="absolute top-1/2 left-1/2 flex w-[379px] -translate-x-1/2 -translate-y-1/2 items-center justify-between mix-blend-luminosity">
        {/* Column 1 */}
        <div className="flex w-[104.493px] flex-col items-center gap-[15px]">
          {column1Logos.map((logo, index) => (
            <LogoCell key={index} logo={logo} />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex w-[100.752px] flex-col items-center gap-[15px]">
          {column2Logos.map((logo, index) => (
            <LogoCell key={index} logo={logo} />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex w-[116.2px] flex-col items-center gap-[15px]">
          {column3Logos.map((logo, index) => (
            <LogoCell key={index} logo={logo} />
          ))}
          {/* Preply has special styling */}
          <div className="flex h-[33.475px] w-[83.296px] items-center justify-center">
            <Image
              src="/assets/sidebar/preply-static.svg"
              alt="Preply"
              className="h-full w-full dark:opacity-70 dark:brightness-0 dark:invert"
              width={83}
              height={33}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
