import NextImage from 'next/image'
import type { ImageProps } from 'next/image'

export const Image = (props: ImageProps) => {
  return <NextImage preload={true} loading="eager" {...props} />
}
