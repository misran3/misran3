interface TerminalLine {
  text: string
  isCommand?: boolean
}

interface TerminalProps {
  lines: TerminalLine[]
  className?: string
}

// Parse line to extract year/now and description for grid layout
function parseJourneyLine(text: string): { year: string; description: string } | null {
  const match = text.match(/^((?:20\d{2}|now)\s*)-\s*(.*)$/)
  if (match) {
    return { year: match[1].trim(), description: match[2] }
  }
  return null
}

export default function Terminal({
  lines,
  className = '',
}: TerminalProps) {
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal__header" aria-hidden="true">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
      </div>
      <div className="terminal__body" role="log" aria-live="polite">
        {lines.map((line, index) => {
          const parsed = parseJourneyLine(line.text)

          return (
            <div
              key={index}
              className={`terminal__line ${line.isCommand ? 'terminal__line--command' : 'terminal__line--output'} ${parsed ? 'terminal__line--grid' : ''}`}
            >
              <span className="terminal__prompt">{line.isCommand ? '$' : '>'}</span>
              {parsed ? (
                <>
                  <span className="terminal__year">{parsed.year}</span>
                  <span className="terminal__desc">{parsed.description}</span>
                </>
              ) : (
                <span className="terminal__text">{line.text}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
