import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from './Terminal'

const journeyLines = [
  { text: 'git log --oneline life', isCommand: true, delay: 400 },
  { text: '2020 - covid lockdown, taught myself to code', isCommand: false, delay: 200 },
  { text: '2022 - first internship at Kickdrum, 6 months of real work', isCommand: false, delay: 200 },
  { text: '2022 - first production deploy', isCommand: false, delay: 200 },
  { text: '2022 - graduated, went full-time at kickdrum', isCommand: false, delay: 200 },
  { text: '2022 - earned trust early, drummer award -- kickdrum\'s highest honor, promoted in 6 months', isCommand: false, delay: 200 },
  { text: '2023 - new challenges, unfamiliar territory, learned fast, delivered', isCommand: false, delay: 200 },
  { text: '2023 - good work speaks, customers requested me, pulled into more projects', isCommand: false, delay: 200 },
  { text: '2023 - trusted to lead, not just code', isCommand: false, delay: 200 },
  { text: '2023 - another drummer award, recognized for leadership and architect-level contributions', isCommand: false, delay: 200 },
  { text: '2024 - new chapter, master\'s at pitt, first in family to study abroad', isCommand: false, delay: 200 },
  { text: '2024 - interned at pitt, kept the coding momentum going', isCommand: false, delay: 200 },
  { text: '2025 - cmu\'s cloud computing, all-nighters, live tests, real-world projects', isCommand: false, delay: 200 },
  { text: '2025 - joined aws cloud innovation center, first on the east coast, connections paid off', isCommand: false, delay: 200 },
  { text: '2025 - smart outreach hub, first open-source project, pitched to business audiences', isCommand: false, delay: 200 },
  { text: '2025 - hackathon, built for the disabled community', isCommand: false, delay: 200 },
  { text: '2025 - devhouse sf, top 100 builders, shipped an AI assistant in 7 days', isCommand: false, delay: 200 },
  { text: '2026 - tartanhacks, 2nd best AI for decision support, 24 hours no sleep', isCommand: false, delay: 200 },
  { text: '2026 - columbia hackathon, ai for good, kept the streak going', isCommand: false, delay: 200 },
  { text: '2026 - flew from pittsburgh to sf, google deepmind x instalily ai hackathon, shipped in 8 hours, top 6 finalist', isCommand: false, delay: 200 },
  { text: '2026 - built phi deidentification solution, second open-source at aws cic', isCommand: false, delay: 200 },
  { text: 'now  - still building at forefront of AI, never stopping', isCommand: false, delay: 0 },
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
