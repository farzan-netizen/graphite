import { Image } from '@/components/base/image'
import { cx } from '@/utils/cx'

interface StaticTextRendererProps {
  text: string
  className?: string
}

export const StaticTextRenderer = ({
  text,
  className,
}: StaticTextRendererProps) => {
  const renderText = (content: string) => {
    const elements: React.ReactNode[] = []
    let currentIndex = 0
    let keyIndex = 0

    // Process text character by character looking for special patterns
    while (currentIndex < content.length) {
      // Check for h2 title pattern: ##**text**
      if (content.slice(currentIndex, currentIndex + 4) === '##**') {
        const endIndex = content.indexOf('**', currentIndex + 4)
        if (endIndex !== -1) {
          const titleText = content.slice(currentIndex + 4, endIndex)
          elements.push(
            <span
              key={keyIndex++}
              className="mb-2 block text-xl font-bold sm:mb-4 sm:text-2xl lg:text-3xl"
            >
              {renderInlineElements(titleText)}
            </span>,
          )
          currentIndex = endIndex + 2
          // Skip newlines after title
          while (
            currentIndex < content.length &&
            content[currentIndex] === '\n'
          ) {
            currentIndex++
          }
          continue
        }
      }

      // Check for avatar pattern: [avatar:url:name]
      if (content.slice(currentIndex, currentIndex + 8) === '[avatar:') {
        const endBracket = content.indexOf(']', currentIndex)
        if (endBracket !== -1) {
          const avatarContent = content.slice(currentIndex + 8, endBracket)
          const [url, name] = avatarContent.split(':')

          elements.push(
            <span
              key={keyIndex++}
              className="mx-0.5 inline-flex items-center align-middle"
              title={name}
            >
              <Image
                src={url}
                alt={name || 'Tool'}
                className="inline-block h-4 w-4 rounded-sm object-contain sm:h-5 sm:w-5"
                width={20}
                height={20}
              />
            </span>,
          )
          currentIndex = endBracket + 1
          continue
        }
      }

      // Check for plan tag pattern: {{Plan}}
      if (content.slice(currentIndex, currentIndex + 2) === '{{') {
        const endBraces = content.indexOf('}}', currentIndex)
        if (endBraces !== -1) {
          const planName = content.slice(currentIndex + 2, endBraces)
          const planColors: Record<string, { bg: string; text: string }> = {
            Starter: { bg: '#EBF5FF', text: '#1E40AF' },
            Growth: { bg: '#F0FDF4', text: '#166534' },
            Enterprise: { bg: '#FEF3C7', text: '#92400E' },
          }
          const colors = planColors[planName] || {
            bg: '#F3F4F6',
            text: '#374151',
          }

          elements.push(
            <span
              key={keyIndex++}
              className="mx-0.5 inline-block rounded px-1.5 py-0.5 text-sm font-semibold sm:px-2 sm:text-base"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {planName}
            </span>,
          )
          currentIndex = endBraces + 2
          continue
        }
      }

      // Check for name/signature pattern: [[Name]]
      if (content.slice(currentIndex, currentIndex + 2) === '[[') {
        const endBrackets = content.indexOf(']]', currentIndex)
        if (endBrackets !== -1) {
          const name = content.slice(currentIndex + 2, endBrackets)
          elements.push(
            <span
              key={keyIndex++}
              className="text-primary mt-4 inline-block -rotate-1 transform text-xl sm:mt-6 sm:text-2xl lg:text-3xl"
              style={{
                fontFamily:
                  'var(--font-dancing-script), Dancing Script, Brush Script MT, cursive',
                letterSpacing: '-0.075em',
              }}
            >
              {name}
            </span>,
          )
          currentIndex = endBrackets + 2
          continue
        }
      }

      // Check for role pattern: ((Role))
      if (content.slice(currentIndex, currentIndex + 2) === '((') {
        const endParens = content.indexOf('))', currentIndex)
        if (endParens !== -1) {
          const role = content.slice(currentIndex + 2, endParens)
          elements.push(
            <span
              key={keyIndex++}
              className="text-tertiary mt-1 block text-xs sm:text-sm"
            >
              {role}
            </span>,
          )
          currentIndex = endParens + 2
          continue
        }
      }

      // Check for bold pattern: **text**
      if (content.slice(currentIndex, currentIndex + 2) === '**') {
        const endBold = content.indexOf('**', currentIndex + 2)
        if (endBold !== -1) {
          const boldText = content.slice(currentIndex + 2, endBold)
          elements.push(
            <strong key={keyIndex++} className="font-semibold">
              {boldText}
            </strong>,
          )
          currentIndex = endBold + 2
          continue
        }
      }

      // Check for newlines (convert to line breaks or paragraph spacing)
      if (content[currentIndex] === '\n') {
        if (content[currentIndex + 1] === '\n') {
          // Double newline = paragraph break
          elements.push(<br key={keyIndex++} className="mb-3 block sm:mb-4" />)
          currentIndex += 2
        } else {
          // Single newline = line break
          elements.push(<br key={keyIndex++} />)
          currentIndex++
        }
        continue
      }

      // Regular text - collect until next special pattern
      let textEnd = currentIndex
      while (textEnd < content.length) {
        const char = content[textEnd]
        const nextTwo = content.slice(textEnd, textEnd + 2)
        const nextFour = content.slice(textEnd, textEnd + 4)
        const nextEight = content.slice(textEnd, textEnd + 8)

        if (
          char === '\n' ||
          nextTwo === '**' ||
          nextTwo === '{{' ||
          nextTwo === '[[' ||
          nextTwo === '((' ||
          nextFour === '##**' ||
          nextEight === '[avatar:'
        ) {
          break
        }
        textEnd++
      }

      if (textEnd > currentIndex) {
        elements.push(
          <span key={keyIndex++}>{content.slice(currentIndex, textEnd)}</span>,
        )
        currentIndex = textEnd
      }
    }

    return elements
  }

  // Helper to process inline elements within titles
  const renderInlineElements = (content: string) => {
    const elements: React.ReactNode[] = []
    let currentIndex = 0
    let keyIndex = 0

    while (currentIndex < content.length) {
      // Check for avatar pattern
      if (content.slice(currentIndex, currentIndex + 8) === '[avatar:') {
        const endBracket = content.indexOf(']', currentIndex)
        if (endBracket !== -1) {
          const avatarContent = content.slice(currentIndex + 8, endBracket)
          const [url, name] = avatarContent.split(':')

          elements.push(
            <span
              key={keyIndex++}
              className="mx-0.5 inline-flex items-center align-middle"
              title={name}
            >
              <Image
                src={url}
                alt={name || 'Tool'}
                className="inline-block h-5 w-5 rounded-sm object-contain sm:h-6 sm:w-6"
                width={24}
                height={24}
              />
            </span>,
          )
          currentIndex = endBracket + 1
          continue
        }
      }

      // Check for plan tag pattern
      if (content.slice(currentIndex, currentIndex + 2) === '{{') {
        const endBraces = content.indexOf('}}', currentIndex)
        if (endBraces !== -1) {
          const planName = content.slice(currentIndex + 2, endBraces)
          const planColors: Record<string, { bg: string; text: string }> = {
            Starter: { bg: '#EBF5FF', text: '#1E40AF' },
            Growth: { bg: '#F0FDF4', text: '#166534' },
            Enterprise: { bg: '#FEF3C7', text: '#92400E' },
          }
          const colors = planColors[planName] || {
            bg: '#F3F4F6',
            text: '#374151',
          }

          elements.push(
            <span
              key={keyIndex++}
              className="mx-0.5 inline-block rounded px-2 py-0.5 text-lg font-semibold sm:text-xl"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {planName}
            </span>,
          )
          currentIndex = endBraces + 2
          continue
        }
      }

      // Regular text
      let textEnd = currentIndex
      while (textEnd < content.length) {
        const nextTwo = content.slice(textEnd, textEnd + 2)
        const nextEight = content.slice(textEnd, textEnd + 8)

        if (nextTwo === '{{' || nextEight === '[avatar:') {
          break
        }
        textEnd++
      }

      if (textEnd > currentIndex) {
        elements.push(
          <span key={keyIndex++}>{content.slice(currentIndex, textEnd)}</span>,
        )
        currentIndex = textEnd
      }
    }

    return elements
  }

  return <div className={cx(className)}>{renderText(text)}</div>
}
