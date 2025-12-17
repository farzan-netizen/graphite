'use client'

import { DecorativeCircle } from './decorative-circle'
import { LogoItem, WakingUpLogo } from './logo-item'

const row1Logos = [
  {
    src: '/assets/sidebar/ibm.svg',
    alt: 'IBM',
    width: 42,
    height: 17,
    className: 'h-[17.076px] w-[42.477px]',
  },
  {
    src: '/assets/sidebar/hubspot.svg',
    alt: 'HubSpot',
    width: 66,
    height: 19,
    className: 'h-[19.211px] w-[65.97px]',
  },
  {
    src: '/assets/sidebar/logitech.svg',
    alt: 'Logitech',
    width: 70,
    height: 26,
    className: 'h-[25.614px] w-[70.358px]',
  },
  {
    src: '/logos/l_backup/lenovo.svg',
    alt: 'Lenovo',
    width: 109,
    height: 23,
    className: 'h-[22.942px] w-[108.576px]',
  },
  {
    src: '/assets/sidebar/flutterflow.svg',
    alt: 'FlutterFlow',
    width: 116,
    height: 21,
    className: 'h-[21.345px] w-[116.293px]',
  },
]

const row2Logos = [
  {
    src: '/assets/sidebar/samsung.svg',
    alt: 'Samsung',
    width: 83,
    height: 13,
    className: 'h-[12.807px] w-[83.002px]',
  },
  {
    src: '/assets/sidebar/mercedes.svg',
    alt: 'Mercedes',
    width: 166,
    height: 38,
    className: 'h-[38.421px] w-[165.892px]',
    noPadding: true,
  },
  {
    src: '/assets/sidebar/bosch.svg',
    alt: 'Bosch',
    width: 80,
    height: 17,
    className: 'h-[17.076px] w-[79.944px]',
  },
  {
    src: '/assets/sidebar/ceros.svg',
    alt: 'Ceros',
    width: 85,
    height: 19,
    className: 'h-[19.211px] w-[84.657px]',
  },
]

const row3Logos = [
  {
    src: '/assets/sidebar/viewsonic.svg',
    alt: 'ViewSonic',
    width: 96,
    height: 38,
    className: 'h-[38.421px] w-[95.604px]',
    noPadding: true,
  },
  { type: 'wakingup' as const },
  {
    src: '/assets/sidebar/intercom.svg',
    alt: 'Intercom',
    width: 92,
    height: 23,
    className: 'h-[23.479px] w-[92.473px]',
  },
  {
    src: '/assets/sidebar/preply.svg',
    alt: 'Preply',
    width: 109,
    height: 38,
    className: 'h-[38.421px] w-[109.329px]',
    noPadding: true,
  },
  {
    src: '/assets/sidebar/xano.svg',
    alt: 'Xano',
    width: 64,
    height: 15,
    className: 'h-[14.942px] w-[63.698px]',
  },
]

type LogoConfig = {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  noPadding?: boolean
  type?: 'wakingup'
}

const renderLogoItem = (logo: LogoConfig, index: number) => {
  if (logo.type === 'wakingup') {
    return <WakingUpLogo key={index} size="md" />
  }
  return (
    <LogoItem
      key={index}
      src={logo.src!}
      alt={logo.alt!}
      width={logo.width!}
      height={logo.height!}
      className={logo.className}
      showPadding={!logo.noPadding}
    />
  )
}

const scrollLeftKeyframes = `
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`

const scrollRightKeyframes = `
  @keyframes scrollRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`

export const AnimatedLogos = () => {
  return (
    <>
      <style>
        {scrollLeftKeyframes}
        {scrollRightKeyframes}
      </style>

      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-[60px] bg-gradient-to-r from-white to-transparent dark:from-[#2a2a2a]" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-[60px] bg-gradient-to-l from-white to-transparent dark:from-[#2a2a2a]" />

      <DecorativeCircle className="top-[12px] left-[-48px]" />
      <DecorativeCircle className="top-[3px] left-[375px]" />
      <DecorativeCircle className="top-[-11px] left-[-48px]" />
      <DecorativeCircle className="top-[-20px] left-[375px]" />

      <div className="absolute top-1/2 left-1/2 flex w-[435px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[27.749px]">
        <div className="w-full overflow-hidden">
          <div
            className="flex items-center gap-[19.211px]"
            style={{
              width: 'max-content',
              animation: 'scrollLeft 40s linear infinite',
            }}
          >
            {row1Logos.map((logo, index) => renderLogoItem(logo, index))}
            {row1Logos.map((logo, index) =>
              renderLogoItem(logo, index + row1Logos.length),
            )}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            className="flex items-center gap-[19.211px]"
            style={{
              width: 'max-content',
              animation: 'scrollRight 45s linear infinite',
            }}
          >
            {row2Logos.map((logo, index) => renderLogoItem(logo, index))}
            {row2Logos.map((logo, index) =>
              renderLogoItem(logo, index + row2Logos.length),
            )}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            className="flex items-center gap-[20.278px]"
            style={{
              width: 'max-content',
              animation: 'scrollLeft 50s linear infinite',
            }}
          >
            {row3Logos.map((logo, index) => renderLogoItem(logo, index))}
            {row3Logos.map((logo, index) =>
              renderLogoItem(logo, index + row3Logos.length),
            )}
          </div>
        </div>
      </div>
    </>
  )
}
