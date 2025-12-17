'use client'

import { ELEMENT_IDS } from '@/constants/element-ids'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { appSelectIsDesktop } from '@/store/app'
import { useAppSelector } from '@/hooks/store'

export const PageStickyFooter = ({
  children,
  isStaticOnDesktop = true,
}: {
  children: ReactNode
  isStaticOnDesktop?: boolean
}) => {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(document.getElementById(ELEMENT_IDS.STICKY_FOOTER) as HTMLElement)
  }, [])

  const isDesktop = useAppSelector(appSelectIsDesktop)
  if (isStaticOnDesktop && isDesktop) {
    return children
  }

  if (!target) {
    return null
  }

  return createPortal(
    <div className="mx-auto w-full max-w-md sm:max-w-lg lg:grow">
      {children}
    </div>,
    document.getElementById(ELEMENT_IDS.STICKY_FOOTER) as HTMLElement,
  )
}
