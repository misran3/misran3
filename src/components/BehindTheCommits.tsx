import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from './Terminal'

const journeyLines = [
  { text: 'git log --oneline life', isCommand: true, delay: 400 },
  { text: '2015 - first line of code', isCommand: false, delay: 200 },
  { text: '2018 - fell in love with the craft', isCommand: false, delay: 200 },
  { text: '2022 - mass systems built', isCommand: false, delay: 200 },
  { text: '2024 - still not bored', isCommand: false, delay: 200 },
  { text: 'now  - building what\'s next', isCommand: false, delay: 0 },
]

const interests = [
  { icon: '🏸', label: 'Badminton' },
  { icon: '🎵', label: 'Music' },
  { icon: '📖', label: 'Placeholder' },
  { icon: '🎮', label: 'Placeholder' },
]

export default function BehindTheCommits() {
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
    amount: 0.3,
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

  const headingVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const interestVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  const animationState = prefersReducedMotion ? 'visible' : isInView ? 'visible' : 'hidden'

  return (
    <section ref={sectionRef} id="behind" className="behind-section">
      <div className="behind-halftone" aria-hidden="true" />

      <motion.div
        className="behind-content"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        <motion.h2 className="behind-heading" variants={headingVariants}>
          Behind the commits
        </motion.h2>

        <motion.p className="behind-tagline" variants={headingVariants}>
          The journey so far. And life beyond the code.
        </motion.p>

        <div className="behind-grid">
          <motion.div className="behind-journey" variants={contentVariants}>
            <Terminal
              lines={journeyLines}
              enabled={isInView && !prefersReducedMotion}
              typingSpeed={35}
            />
          </motion.div>

          <motion.div className="behind-interests" variants={contentVariants}>
            <div className="behind-interests__grid">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="behind-interest"
                  variants={interestVariants}
                >
                  <span className="behind-interest__icon">{interest.icon}</span>
                  <span className="behind-interest__label">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
