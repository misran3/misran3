import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CodeSnippet from './CodeSnippet'

const codeLines = [
  { text: 'function build() {', delay: 300 },
  { text: '  const passion = true;', delay: 200 },
  { text: '  let problems = [];', delay: 200 },
  { text: '', delay: 100 },
  { text: '  while (passion) {', delay: 300 },
  { text: '    if (problems.length > 0) {', delay: 200 },
  { text: '      analyze(problems);', delay: 200 },
  { text: '      solve(problems);', delay: 200 },
  { text: '    } else {', delay: 200 },
  { text: '      learn();', delay: 200 },
  { text: '      create();', delay: 200 },
  { text: '    }', delay: 200 },
  { text: '', delay: 100 },
  { text: '    ship();', delay: 200 },
  { text: '  }', delay: 200 },
  { text: '}', delay: 0 },
]

export default function Why() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
  })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const markerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const terminalVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const animationState = prefersReducedMotion ? 'visible' : isInView ? 'visible' : 'hidden'

  return (
    <section ref={sectionRef} id="why" className="origin-section">
      <div className="origin-halftone" aria-hidden="true" />
      <div className="origin-gradient" aria-hidden="true" />

      <motion.div
        className="origin-content"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        <motion.span className="origin-marker" variants={markerVariants}>
          01
        </motion.span>

        <motion.h2 className="origin-heading" variants={headingVariants}>
          Why
        </motion.h2>

        <motion.p className="origin-tagline" variants={headingVariants}>
          Love the craft. Love the grind.
        </motion.p>

        <motion.div variants={terminalVariants}>
          <CodeSnippet
            lines={codeLines}
            enabled={isInView && !prefersReducedMotion}
            typingSpeed={30}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
