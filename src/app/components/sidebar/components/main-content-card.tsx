interface MainContentCardProps {
  isLargeText?: boolean
}

export const MainContentCard = ({
  isLargeText = false,
}: MainContentCardProps) => {
  return (
    <div className="w-[436px] rounded-[20px] border border-[#e7e7e7] bg-white p-[20px] dark:border-[#353535] dark:bg-[#2a2a2a]">
      <div className="flex flex-col gap-[12px]">
        <p
          className={`font-bold ${isLargeText ? 'text-[28px] leading-[32px]' : 'text-[23px] leading-normal'} text-black dark:text-white`}
        >
          Transform Customer Connections Into Revenue Growth
        </p>
        <p className="text-[16px] leading-normal font-medium text-[#929292] dark:text-[#929292]">
          Join 500+ growing SaaS companies using Bettermode for advanced
          community capabilities. Seamless integrations, powerful analytics, and
          proven frameworks that scale efficiently as you grow.
        </p>
      </div>
    </div>
  )
}
