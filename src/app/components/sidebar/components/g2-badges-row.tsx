import { G2Badge } from './g2-badge'

interface G2BadgesRowProps {
  badges: Array<{
    src: string
    alt: string
  }>
}

export const G2BadgesRow = ({ badges }: G2BadgesRowProps) => {
  return (
    <div className="flex w-[436px] gap-[16px]">
      {badges.map((badge, index) => (
        <G2Badge key={index} src={badge.src} alt={badge.alt} />
      ))}
    </div>
  )
}
