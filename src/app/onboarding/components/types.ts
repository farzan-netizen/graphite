import type { CSSProperties, FC } from 'react'

export interface SpaceOption {
  id: string
  name: string
  description: string
  icon: FC<{ className?: string; style?: CSSProperties }>
}
