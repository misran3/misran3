import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  text: string
  isCommand?: boolean
  delay?: number
}

interface TerminalProps {
  lines: TerminalLine[]
  enabled?: boolean
  typingSpeed?: number
  className?: string
}

// Parse line to highlight year or "now" prefix
function renderLineWithHighlight(text: string) {
  // Match year pattern (e.g., "2020 - ", "2022 - ") or "now  - " at start
  const match = text.match(/^((?:20\d{2}|now)\s*-\s*)(.*)$/)
  if (match) {
    return (
      <>
        <span className="terminal__year">{match[1]}</span>
        <span>{match[2]}</span>
      </>
    )
  }
  return text
}

export default function Terminal({
  lines,
  enabled = true,
  typingSpeed = 50,
  className = '',
}: TerminalProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [lastLineText, setLastLineText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const lastLine = lines[lines.length - 1]
  const staticLines = lines.slice(0, -1)

  // Type only the last line
  useEffect(() => {
    if (!enabled || !lastLine) {
      setLastLineText(lastLine?.text || '')
      setIsTypingComplete(true)
      return
    }

    setLastLineText('')
    setIsTypingComplete(false)
    let currentIndex = 0
    const text = lastLine.text

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setLastLineText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [enabled, lastLine, typingSpeed])

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lastLineText])

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal__header" aria-hidden="true">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
      </div>
      <div className="terminal__body" role="log" aria-live="polite" ref={bodyRef}>
        {/* Static lines - no animation */}
        {staticLines.map((line, index) => (
          <div
            key={index}
            className={`terminal__line ${line.isCommand ? 'terminal__line--command' : 'terminal__line--output'}`}
          >
            <span className="terminal__prompt">{line.isCommand ? '$' : '>'}</span>
            <span className="terminal__text">{renderLineWithHighlight(line.text)}</span>
          </div>
        ))}

        {/* Last line - with typing animation */}
        {lastLine && (
          <motion.div
            className={`terminal__line ${lastLine.isCommand ? 'terminal__line--command' : 'terminal__line--output'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="terminal__prompt">{lastLine.isCommand ? '$' : '>'}</span>
            <span className="terminal__text">{renderLineWithHighlight(lastLineText)}</span>
            {!isTypingComplete && (
              <motion.span
                className="terminal__cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                █
              </motion.span>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
