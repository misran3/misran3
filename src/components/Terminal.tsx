import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

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

export default function Terminal({
  lines,
  enabled = true,
  typingSpeed = 50,
  className = '',
}: TerminalProps) {
  const { displayedLines, currentLineIndex, isComplete } = useTypewriter({
    lines,
    typingSpeed,
    enabled,
  })

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal__header">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
      </div>
      <div className="terminal__body">
        {lines.map((line, index) => {
          const displayedText = displayedLines[index] || ''
          const isCurrentLine = index === currentLineIndex
          const isTyped = index < currentLineIndex || (index === currentLineIndex && displayedText.length > 0)

          if (!isTyped && index > currentLineIndex) return null

          return (
            <motion.div
              key={index}
              className={`terminal__line ${line.isCommand ? 'terminal__line--command' : 'terminal__line--output'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {line.isCommand && <span className="terminal__prompt">$</span>}
              {!line.isCommand && <span className="terminal__prompt">&gt;</span>}
              <span className="terminal__text">{displayedText}</span>
              {isCurrentLine && !isComplete && (
                <motion.span
                  className="terminal__cursor"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  █
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
