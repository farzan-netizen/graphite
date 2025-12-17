import { Image } from '@/components/base/image'

interface G2BadgeProps {
  src: string
  alt: string
}

export const G2Badge = ({ src, alt }: G2BadgeProps) => {
  return (
    <div className="flex h-[138px] flex-1 items-center justify-center rounded-[13px] border border-[#e7e7e7] bg-white p-[22.682px] dark:border-[#353535] dark:bg-[#2a2a2a]">
      <Image
        src={src}
        alt={alt}
        className="h-[84px] w-[76.364px]"
        width={76}
        height={84}
      />
    </div>
  )
}
