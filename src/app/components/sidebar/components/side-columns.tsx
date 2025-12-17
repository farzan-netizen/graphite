import { EmptyCard } from './empty-card'

interface SideColumnsProps {
  position: 'left' | 'right'
}

export const SideColumns = ({ position }: SideColumnsProps) => {
  const positionClass =
    position === 'left' ? 'right-[calc(100%+16px)]' : 'left-[calc(100%+16px)]'

  return (
    <div
      className={`absolute top-0 bottom-0 ${positionClass} flex flex-col justify-between`}
    >
      <EmptyCard width="sm" className="flex-1" />
      <div className="h-[16px]" />
      <EmptyCard width="sm" className="flex-1" />
      <div className="h-[16px]" />
      <EmptyCard width="sm" className="flex-1" />
      <div className="h-[16px]" />
      <EmptyCard width="sm" className="flex-1" />
    </div>
  )
}
