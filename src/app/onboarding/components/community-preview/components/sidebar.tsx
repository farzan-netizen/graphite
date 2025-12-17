import type { Theme } from '../type'
import {
  ScrollbarStyles,
  getScrollbarStyle,
  getScrollbarClassName,
} from './scrollbar-styles'
import { FeedItem } from './feed-item'
import { SpaceGroup } from './space-group'
import { PlaceholderSpaces } from './placeholder-spaces'
import { SPACE_OPTIONS } from '../../constants'

interface Props {
  currentStep: number
  primaryColor?: string
  selectedSpaces: string[]
  isDark: boolean
  theme: Theme
}

export const CommunityPreviewSidebar = ({
  currentStep,
  primaryColor,
  selectedSpaces,
  isDark,
  theme,
}: Props) => {
  const selectedSpacesItems = SPACE_OPTIONS.filter(item =>
    selectedSpaces.includes(item.id),
  )

  return (
    <div
      className="flex w-48 shrink-0 flex-col border-r p-2 sm:w-56 sm:p-3 lg:w-64 lg:p-4"
      style={{
        backgroundColor: theme.bgSecondary,
        borderColor: theme.border,
      }}
    >
      <ScrollbarStyles isDark={isDark} prefix="preview-sidebar" />
      <div
        className={`${getScrollbarClassName(isDark, 'preview-sidebar')} flex-1 space-y-1 overflow-y-auto`}
        style={getScrollbarStyle(isDark)}
      >
        <FeedItem primaryColor={primaryColor} isDark={isDark} theme={theme} />

        {currentStep >= 3 && (
          <SpaceGroup
            items={selectedSpacesItems}
            primaryColor={primaryColor}
            isDark={isDark}
            theme={theme}
          />
        )}

        {(currentStep < 3 || selectedSpaces.length === 0) && (
          <PlaceholderSpaces isDark={isDark} />
        )}
      </div>
    </div>
  )
}
