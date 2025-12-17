import { ELEMENT_IDS } from '@/constants/element-ids'

export const useScroll = () => {
  const scrollToEnd = () => {
    const scrollContainer = document.getElementById(
      ELEMENT_IDS.SCROLL_CONTAINER,
    )
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'instant',
      })
    }
  }

  return {
    scrollToEnd,
  }
}
