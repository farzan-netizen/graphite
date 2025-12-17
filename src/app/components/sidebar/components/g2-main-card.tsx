import { Image } from '@/components/base/image'

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '4,000,000', label: 'People' },
  { value: '2,000', label: 'Enterprise community' },
]

export const G2MainCard = () => {
  return (
    <div className="w-[436px] rounded-[20px] border border-[#e7e7e7] bg-white p-[24px] dark:border-[#353535] dark:bg-[#2a2a2a]">
      <div className="flex flex-col gap-[16px]">
        <div className="h-[44px] w-[44px]">
          <Image
            src="/assets/sidebar/g2-logo.svg"
            alt="G2.com logo"
            className="h-full w-full"
            width={44}
            height={44}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <p className="text-left text-[23px] leading-normal font-bold text-black dark:text-white">
            Built-In Security &<br />
            Compliance From Day One
          </p>
          <div className="flex gap-[32px]">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-[20px] leading-normal font-bold text-black dark:text-white">
                  {stat.value}
                  <span className="ml-[8px] text-[24px] font-normal text-[#666] dark:text-[#929292]">
                    +
                  </span>
                </p>
                <p className="text-[14px] leading-normal font-normal text-black dark:text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
