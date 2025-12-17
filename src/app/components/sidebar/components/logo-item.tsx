import { Image } from '@/components/base/image'
import { cx } from '@/utils/cx'

interface LogoItemProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  containerClassName?: string
  showPadding?: boolean
}

export const LogoItem = ({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  showPadding = true,
}: LogoItemProps) => {
  return (
    <div
      className={cx(
        'flex h-[38.421px] items-center justify-center',
        showPadding && 'px-[8.538px] py-[6.404px]',
        containerClassName,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className={cx(
          'dark:opacity-70 dark:brightness-0 dark:invert',
          className,
        )}
        width={width}
        height={height}
      />
    </div>
  )
}

interface WakingUpLogoProps {
  size?: 'sm' | 'md'
}

export const WakingUpLogo = ({ size = 'md' }: WakingUpLogoProps) => {
  const isSmall = size === 'sm'

  return (
    <div
      className={cx(
        'flex h-[38.421px] items-center justify-center',
        !isSmall && 'px-[8.538px] py-[6.404px]',
      )}
    >
      <div
        className={cx(
          'relative',
          isSmall ? 'h-[16.737px] w-[89.615px]' : 'h-[19.211px] w-[102.856px]',
        )}
      >
        <Image
          src={
            isSmall
              ? '/assets/sidebar/waking-up-static.svg'
              : '/assets/sidebar/waking-up.svg'
          }
          alt="Waking Up"
          className={cx(
            'absolute top-0 left-0 dark:opacity-70 dark:brightness-0 dark:invert',
            isSmall ? 'h-[16.737px] w-[16.737px]' : 'h-[19.211px] w-[19.211px]',
          )}
          width={isSmall ? 17 : 19}
          height={isSmall ? 17 : 19}
        />
        <p
          className={cx(
            'absolute font-semibold whitespace-nowrap text-[#3195ff] dark:text-white',
            isSmall
              ? 'top-[0.7px] left-[16.74px] text-[13.25px] tracking-[-0.3975px]'
              : 'top-[0.8px] left-[19.21px] text-[15.208px] tracking-[-0.4562px]',
          )}
          style={{ fontFamily: 'Inter' }}
        >
          WAKING UP
        </p>
      </div>
    </div>
  )
}
