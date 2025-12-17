'use client'

import { useEffect, useState, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { Image } from '@/components/base/image'

interface TypingAnimationProps {
  children: ReactNode
  className?: string
  duration?: number
  startOnView?: boolean
  delay?: number
  as?: React.ElementType
}

interface TextSegment {
  text: string
  type:
    | 'normal'
    | 'bold'
    | 'brand'
    | 'break'
    | 'avatar'
    | 'signature'
    | 'small'
    | 'large'
    | 'large-bold'
  avatarSrc?: string
  avatarAlt?: string
}

export function TypingAnimation({
  children,
  className,
  duration = 64,
  startOnView = false,
  delay = 0,
  as: Component = 'div',
}: TypingAnimationProps) {
  const [segments, setSegments] = useState<TextSegment[]>([])
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnView)
  const [isComplete, setIsComplete] = useState(false)

  // Parse the children to extract segments with formatting
  useEffect(() => {
    if (typeof children === 'string') {
      // Simple string parsing for **bold**, {{brand}}, \n, and [avatar:src:alt]
      const parseSegments = (text: string): TextSegment[] => {
        const segments: TextSegment[] = []
        const currentText = text

        // Split by line breaks first
        const lines = currentText.split('\n')

        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            segments.push({ text: '', type: 'break' })
          }

          let remainingLine = line

          while (remainingLine.length > 0) {
            // Check for large text pattern ##text (must be processed first)
            if (remainingLine.startsWith('##')) {
              const lineEnd = remainingLine.indexOf('\n')
              const lineText =
                lineEnd === -1
                  ? remainingLine.slice(2)
                  : remainingLine.slice(2, lineEnd)

              // Process the large text for bold formatting
              let largeLine = lineText
              while (largeLine.length > 0) {
                // Check for bold pattern **text** within large text
                const boldMatch = largeLine.match(/^\*\*([^*]+)\*\*/)
                if (boldMatch) {
                  segments.push({ text: boldMatch[1], type: 'large-bold' })
                  largeLine = largeLine.slice(boldMatch[0].length)
                  continue
                }

                // Regular text until next bold pattern
                const nextBold = largeLine.search(/(\*\*)/)
                if (nextBold === -1) {
                  if (largeLine.trim()) {
                    segments.push({ text: largeLine, type: 'large' })
                  }
                  break
                } else {
                  const normalText = largeLine.slice(0, nextBold)
                  if (normalText) {
                    segments.push({ text: normalText, type: 'large' })
                  }
                  largeLine = largeLine.slice(nextBold)
                }
              }

              remainingLine = lineEnd === -1 ? '' : remainingLine.slice(lineEnd)
              continue
            }

            // Check for avatar pattern [avatar:src:alt]
            const avatarMatch = remainingLine.match(
              /^\[avatar:([^:]+):([^\]]+)\]/,
            )
            if (avatarMatch) {
              segments.push({
                text: '',
                type: 'avatar',
                avatarSrc: avatarMatch[1],
                avatarAlt: avatarMatch[2],
              })
              remainingLine = remainingLine.slice(avatarMatch[0].length)
              continue
            }

            // Check for bold pattern **text**
            const boldMatch = remainingLine.match(/^\*\*([^*]+)\*\*/)
            if (boldMatch) {
              segments.push({ text: boldMatch[1], type: 'bold' })
              remainingLine = remainingLine.slice(boldMatch[0].length)
              continue
            }

            // Check for brand pattern {{text}}
            const brandMatch = remainingLine.match(/^\{\{([^}]+)\}\}/)
            if (brandMatch) {
              segments.push({ text: brandMatch[1], type: 'brand' })
              remainingLine = remainingLine.slice(brandMatch[0].length)
              continue
            }

            // Check for signature pattern [[text]]
            const signatureMatch = remainingLine.match(/^\[\[([^\]]+)\]\]/)
            if (signatureMatch) {
              segments.push({ text: signatureMatch[1], type: 'signature' })
              remainingLine = remainingLine.slice(signatureMatch[0].length)
              continue
            }

            // Check for small text pattern ((text))
            const smallMatch = remainingLine.match(/^\(\(([^)]+)\)\)/)
            if (smallMatch) {
              // Parse content inside small text for avatars and other patterns
              const smallContent = smallMatch[1]
              let smallRemaining = smallContent

              while (smallRemaining.length > 0) {
                // Find avatar pattern position
                const nextAvatar = smallRemaining.search(/\[avatar:/)

                if (nextAvatar === -1) {
                  // No avatar found, add remaining text
                  if (smallRemaining.trim()) {
                    segments.push({ text: smallRemaining, type: 'small' })
                  }
                  break
                } else if (nextAvatar === 0) {
                  // Avatar at start, parse it
                  const avatarMatch = smallRemaining.match(
                    /^\[avatar:([^:]+):([^\]]+)\]/,
                  )
                  if (avatarMatch) {
                    segments.push({
                      text: '',
                      type: 'avatar',
                      avatarSrc: avatarMatch[1],
                      avatarAlt: avatarMatch[2],
                    })
                    smallRemaining = smallRemaining.slice(avatarMatch[0].length)
                    continue
                  }
                } else {
                  // Text before avatar
                  const textBefore = smallRemaining.slice(0, nextAvatar)
                  if (textBefore.trim()) {
                    segments.push({ text: textBefore, type: 'small' })
                  }
                  smallRemaining = smallRemaining.slice(nextAvatar)
                  // Now parse the avatar
                  const avatarMatch = smallRemaining.match(
                    /^\[avatar:([^:]+):([^\]]+)\]/,
                  )
                  if (avatarMatch) {
                    segments.push({
                      text: '',
                      type: 'avatar',
                      avatarSrc: avatarMatch[1],
                      avatarAlt: avatarMatch[2],
                    })
                    smallRemaining = smallRemaining.slice(avatarMatch[0].length)
                    continue
                  }
                }
              }

              remainingLine = remainingLine.slice(smallMatch[0].length)
              continue
            }

            // Regular text until next special pattern
            const nextSpecial = remainingLine.search(
              /(\*\*|\{\{|\[\[|\(\(|\[avatar:|##)/,
            )
            if (nextSpecial === -1) {
              if (remainingLine.trim()) {
                segments.push({ text: remainingLine, type: 'normal' })
              }
              break
            } else {
              const normalText = remainingLine.slice(0, nextSpecial)
              if (normalText) {
                segments.push({ text: normalText, type: 'normal' })
              }
              remainingLine = remainingLine.slice(nextSpecial)
            }
          }
        })

        return segments
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSegments(parseSegments(children))
    }
  }, [children])

  // Typing animation effect
  useEffect(() => {
    if (!isVisible || segments.length === 0) return

    const typeNextChar = () => {
      if (currentSegmentIndex >= segments.length) {
        setIsComplete(true)
        return
      }

      const currentSegment = segments[currentSegmentIndex]

      if (currentSegment.type === 'break' || currentSegment.type === 'avatar') {
        // Small pause for breaks and avatars
        setTimeout(() => {
          setCurrentCharIndex(0)
          setCurrentSegmentIndex(prev => prev + 1)
        }, duration * 3)
      } else if (currentCharIndex < currentSegment.text.length) {
        const char = currentSegment.text[currentCharIndex]
        // Variable speed based on character
        let charDuration = duration

        if (char === '.' || char === '!' || char === '?') {
          charDuration = duration * 4 // Longer pause for sentence endings
        } else if (char === ',' || char === ';') {
          charDuration = duration * 2.5 // Medium pause for commas
        } else if (char === ' ') {
          charDuration = duration * 0.7 // Slightly faster for spaces
        } else if (char === '—') {
          charDuration = duration * 2 // Pause for em dash
        }

        setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1)
        }, charDuration)
      } else {
        // Move to next segment with small pause
        setTimeout(() => {
          setCurrentCharIndex(0)
          setCurrentSegmentIndex(prev => prev + 1)
        }, duration * 1.5)
      }
    }

    const timer = setTimeout(typeNextChar, delay)
    return () => clearTimeout(timer)
  }, [
    currentSegmentIndex,
    currentCharIndex,
    segments,
    duration,
    delay,
    isVisible,
  ])

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.1 },
      )

      const element = document.getElementById('typing-animation')
      if (element) {
        observer.observe(element)
      }

      return () => {
        if (element) {
          observer.unobserve(element)
        }
      }
    }
  }, [startOnView])

  const renderSegments = () => {
    return segments.map((segment, segmentIndex) => {
      if (segmentIndex > currentSegmentIndex) return null

      const isCurrentSegment = segmentIndex === currentSegmentIndex
      const textToShow = isCurrentSegment
        ? segment.text.substring(0, currentCharIndex)
        : segment.text

      // Check if break is between signature and small text
      const isBetweenSignatureAndSmall =
        segment.type === 'break' &&
        segmentIndex > 0 &&
        segmentIndex < segments.length - 1 &&
        segments[segmentIndex - 1]?.type === 'signature' &&
        segments[segmentIndex + 1]?.type === 'small'

      // Check if break is before signature
      // Look ahead to find if next non-break segment is signature
      const isBeforeSignature = (() => {
        if (segment.type !== 'break' || segmentIndex >= segments.length - 1) {
          return false
        }
        // Find next non-break segment
        for (let i = segmentIndex + 1; i < segments.length; i++) {
          if (segments[i]?.type === 'signature') {
            return true
          }
          if (segments[i]?.type !== 'break') {
            break
          }
        }
        return false
      })()

      switch (segment.type) {
        case 'break':
          if (isBetweenSignatureAndSmall) {
            return <div key={segmentIndex} className="h-0" />
          }
          if (isBeforeSignature) {
            return <div key={segmentIndex} className="my-6" />
          }
          return <div key={segmentIndex} className="my-2" />

        case 'avatar':
          // Check if previous or next segment is small to apply small styling
          // eslint-disable-next-line no-case-declarations
          const isInSmallText =
            (segmentIndex > 0 &&
              segments[segmentIndex - 1]?.type === 'small') ||
            (segmentIndex < segments.length - 1 &&
              segments[segmentIndex + 1]?.type === 'small')
          return (
            <Image
              key={segmentIndex}
              src={segment.avatarSrc!}
              alt={segment.avatarAlt || 'avatar'}
              className={cx(
                'inline rounded-full border border-gray-200 align-middle',
                isInSmallText ? 'mx-0.5 h-3 w-3' : 'mx-1 h-6 w-6',
              )}
              width={isInSmallText ? 12 : 24}
              height={isInSmallText ? 12 : 24}
            />
          )

        case 'bold':
          return (
            <span key={segmentIndex} className="leading-tight font-semibold">
              {textToShow}
            </span>
          )

        case 'brand':
          return (
            <span
              key={segmentIndex}
              className="text-brand-secondary leading-tight font-bold"
            >
              {textToShow}
            </span>
          )

        case 'signature':
          return (
            <span
              key={segmentIndex}
              className="text-primary inline-block -rotate-1 transform text-xl sm:text-2xl lg:text-3xl"
              style={{
                fontFamily:
                  'var(--font-dancing-script), Dancing Script, Brush Script MT, cursive',
                letterSpacing: '-0.075em',
              }}
            >
              {textToShow}
            </span>
          )

        case 'small':
          return (
            <span
              key={segmentIndex}
              className="text-tertiary inline-flex items-center text-xs sm:text-sm"
            >
              {textToShow}
            </span>
          )

        case 'large':
          return (
            <span key={segmentIndex} className="text-2xl">
              {textToShow}
            </span>
          )

        case 'large-bold':
          return (
            <span
              key={segmentIndex}
              style={{
                fontFamily: 'Manrope, "Manrope Placeholder", sans-serif',
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '-0.96px',
                lineHeight: '34px',
              }}
            >
              {textToShow}
            </span>
          )

        case 'normal':
        default:
          return (
            <span key={segmentIndex} className="leading-tight">
              {textToShow}
            </span>
          )
      }
    })
  }

  return (
    <Component id="typing-animation" className={cx(className)}>
      {renderSegments()}
      {!isComplete && (
        <span className="text-brand-secondary animate-pulse">|</span>
      )}
    </Component>
  )
}
