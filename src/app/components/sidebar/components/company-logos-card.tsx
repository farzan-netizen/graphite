import { AnimatedLogos } from './animated-logos'
import { StaticLogos } from './static-logos'

interface CompanyLogosCardProps {
  isAnimated: boolean
}

export const CompanyLogosCard = ({ isAnimated }: CompanyLogosCardProps) => {
  return (
    <div className="relative h-[227px] w-[436px] overflow-hidden rounded-[20px] border border-[#e7e7e7] bg-white dark:border-[#353535] dark:bg-[#2a2a2a]">
      {isAnimated ? <AnimatedLogos /> : <StaticLogos />}
    </div>
  )
}
