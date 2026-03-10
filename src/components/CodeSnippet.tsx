import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

interface CodeLine {
  text: string
  delay?: number
}

interface CodeSnippetProps {
  lines: CodeLine[]
  enabled?: boolean
  typingSpeed?: number
  className?: string
}

// Simple tokenizer for TypeScript syntax highlighting
function tokenize(text: string): Array<{ type: string; value: string }> {
  const tokens: Array<{ type: string; value: string }> = []
  const keywords = ['function', 'const', 'let', 'var', 'while', 'if', 'else', 'return', 'true', 'false']

  let current = 0

  while (current < text.length) {
    const char = text[current]

    // Whitespace
    if (/\s/.test(char)) {
      let value = ''
      while (current < text.length && /\s/.test(text[current])) {
        value += text[current]
        current++
      }
      tokens.push({ type: 'whitespace', value })
      continue
    }

    // Punctuation and operators
    if (/[{}()[\];,><=!+\-*/.:]/.test(char)) {
      tokens.push({ type: 'punctuation', value: char })
      current++
      continue
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let value = ''
      while (current < text.length && /[a-zA-Z0-9_]/.test(text[current])) {
        value += text[current]
        current++
      }

      if (keywords.includes(value)) {
        if (value === 'true' || value === 'false') {
          tokens.push({ type: 'boolean', value })
        } else {
          tokens.push({ type: 'keyword', value })
        }
      } else {
        tokens.push({ type: 'identifier', value })
      }
      continue
    }

    // Numbers
    if (/[0-9]/.test(char)) {
      let value = ''
      while (current < text.length && /[0-9]/.test(text[current])) {
        value += text[current]
        current++
      }
      tokens.push({ type: 'number', value })
      continue
    }

    // Fallback
    tokens.push({ type: 'text', value: char })
    current++
  }

  return tokens
}

export default function CodeSnippet({
  lines,
  enabled = true,
  typingSpeed = 50,
  className = '',
}: CodeSnippetProps) {
  const { displayedLines, currentLineIndex, isComplete } = useTypewriter({
    lines,
    typingSpeed,
    enabled,
  })

  return (
    <div className={`code-snippet ${className}`}>
      <div className="code-snippet__header" aria-hidden="true">
        <span className="code-snippet__dot code-snippet__dot--red" />
        <span className="code-snippet__dot code-snippet__dot--yellow" />
        <span className="code-snippet__dot code-snippet__dot--green" />
      </div>
      <div className="code-snippet__body" role="log" aria-live="polite">
        {lines.map((_, index) => {
          const displayedText = displayedLines[index] || ''
          const isCurrentLine = index === currentLineIndex
          const isTyped = index < currentLineIndex || (index === currentLineIndex && displayedText.length > 0)

          if (!isTyped && index > currentLineIndex) return null

          const tokens = tokenize(displayedText)

          return (
            <motion.div
              key={index}
              className="code-snippet__line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <span className="code-snippet__line-number">{index + 1}</span>
              <span className="code-snippet__code">
                {tokens.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className={`code-snippet__token code-snippet__token--${token.type}`}
                  >
                    {token.value}
                  </span>
                ))}
                {isCurrentLine && !isComplete && (
                  <motion.span
                    className="code-snippet__cursor"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                )}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
