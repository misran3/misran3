interface TerminalLine {
  command?: string
  outputText?: { year: string, description: string }
}

interface TerminalProps {
  lines: TerminalLine[]
  className?: string
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

          return (
            <div
              key={index}
              className={`terminal__line ${line.command ? 'terminal__line--command' : 'terminal__line--output'} ${line.outputText ? 'terminal__line--grid' : ''}`}
            >
              <span className="terminal__prompt">{line.command ? '$' : '>'}</span>
              {line.command && (<span className="terminal__text">{line.command}</span>)}
              {line.outputText && (
                <>
                  <span className="terminal__year">{line.outputText.year}</span>
                  <span className="terminal__desc">{line.outputText.description}</span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
