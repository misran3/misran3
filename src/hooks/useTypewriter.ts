import { useState, useEffect } from 'react'

interface TypewriterLine {
  text: string
  isCommand?: boolean
  delay?: number
}

interface UseTypewriterOptions {
  lines: TypewriterLine[]
  typingSpeed?: number
  lineDelay?: number
  startDelay?: number
  enabled?: boolean
}

interface TypewriterState {
  displayedLines: string[]
  currentLineIndex: number
  isComplete: boolean
}

export function useTypewriter({
  lines,
  typingSpeed = 50,
  lineDelay = 300,
  startDelay = 500,
  enabled = true,
}: UseTypewriterOptions): TypewriterState {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Reset when disabled
  useEffect(() => {
    if (!enabled) {
      setDisplayedLines([])
      setCurrentLineIndex(0)
      setCurrentCharIndex(0)
      setIsComplete(false)
      setHasStarted(false)
    }
  }, [enabled])

  // Start delay
  useEffect(() => {
    if (!enabled || hasStarted) return

    const timer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [enabled, hasStarted, startDelay])

  // Typing effect
  useEffect(() => {
    if (!enabled || !hasStarted || isComplete) return
    if (currentLineIndex >= lines.length) {
      setIsComplete(true)
      return
    }

    const currentLine = lines[currentLineIndex]
    const fullText = currentLine.text

    if (currentCharIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[currentLineIndex] = fullText.slice(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, currentLine.isCommand ? typingSpeed : typingSpeed * 0.5)

      return () => clearTimeout(timer)
    } else {
      // Line complete, move to next
      const delay = currentLine.delay ?? lineDelay
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [enabled, hasStarted, isComplete, currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay])

  return { displayedLines, currentLineIndex, isComplete }
}
