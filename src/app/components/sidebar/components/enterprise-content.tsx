import { EmptyCard } from './empty-card'
import { G2BadgesRow } from './g2-badges-row'
import { G2MainCard } from './g2-main-card'

const topBadges = [
  { src: '/assets/sidebar/g2-leaders.svg', alt: 'G2 Leader' },
  { src: '/assets/sidebar/g2-ease-of-use.svg', alt: 'Easiest to use' },
  {
    src: '/assets/sidebar/g2-ease-of-use-business.svg',
    alt: 'Easiest to do business',
  },
]

const bottomBadges = [
  { src: '/assets/sidebar/g2-high-performer.svg', alt: 'High Performer' },
  { src: '/assets/sidebar/g2-support.svg', alt: 'Best Support' },
  { src: '/assets/sidebar/g2-momentum-leader.svg', alt: 'Momentum Leader' },
]

export const EnterpriseContent = () => {
  return (
    <>
      <EmptyCard className="h-[256px]" />
      <G2BadgesRow badges={topBadges} />
      <G2MainCard />
      <G2BadgesRow badges={bottomBadges} />
      <EmptyCard className="h-[256px]" />
    </>
  )
}
