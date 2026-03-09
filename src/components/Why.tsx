import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from './Terminal'

const terminalLines = [
  { text: 'ps aux | grep misran', isCommand: true, delay: 400 },
  { text: 'learning    always running', isCommand: false, delay: 200 },
  { text: 'building    always running', isCommand: false, delay: 200 },
  { text: 'shipping    always running', isCommand: false, delay: 200 },
  { text: 'stopping    not found', isCommand: false, delay: 0 },
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

        <motion.div variants={terminalVariants}>
          <Terminal
            lines={terminalLines}
            enabled={isInView && !prefersReducedMotion}
            typingSpeed={40}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
