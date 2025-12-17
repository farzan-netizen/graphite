import { Image } from '@/components/base/image'

export const IntegrationsCard = () => {
  return (
    <div className="w-[436px] rounded-[20px] border border-[#e7e7e7] bg-white px-[28px] py-[40px] dark:border-[#353535] dark:bg-[#2a2a2a]">
      <div className="flex h-full flex-col items-start justify-between gap-[160px]">
        <div className="relative h-[32px] w-[52px]">
          <Image
            src="/assets/sidebar/plugs-icon.svg"
            alt="Plugs icon"
            className="h-full w-full brightness-0 dark:brightness-0 dark:invert"
            width={52}
            height={32}
          />
        </div>
        <div className="flex w-full flex-col gap-[12px]">
          <p className="text-[32px] leading-[32px] font-bold text-black dark:text-white">
            Accelerate Implementation With Expert Guidance
          </p>
          <p className="text-[18px] leading-normal font-medium text-[#929292] dark:text-[#929292]">
            Get up and running fast with proven setup frameworks designed for
            SaaS teams.
          </p>
        </div>
      </div>
    </div>
  )
}
