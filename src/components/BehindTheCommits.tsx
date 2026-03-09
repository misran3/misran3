import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from './Terminal'

const journeyLines = [
  { command: 'git log --oneline life' },
  { outputText: { year: '2020', description: 'covid lockdown, taught myself to code' } },
  { outputText: { year: '2022', description: 'first internship at kickdrum, 6 months of real work' } },
  { outputText: { year: '2022', description: 'first production deploy' } },
  { outputText: { year: '2022', description: 'graduated, went full-time at kickdrum' } },
  { outputText: { year: '2022', description: 'earned trust early, drummer award -- kickdrum\'s highest honor, promoted in 6 months' } },
  { outputText: { year: '2023', description: 'new challenges, unfamiliar territory, learned fast, delivered' } },
  { outputText: { year: '2023', description: 'good work speaks, customers requested me, pulled into more projects' } },
  { outputText: { year: '2023', description: 'trusted to lead, not just code' } },
  { outputText: { year: '2023', description: 'another drummer award, recognized for leadership and architect-level contributions' } },
  { outputText: { year: '2024', description: 'new chapter, master\'s at pitt, first in family to study abroad' } },
  { outputText: { year: '2024', description: 'interned at pitt, kept the coding momentum going' } },
  { outputText: { year: '2025', description: 'cmu\'s cloud computing, all-nighters, live tests, real-world projects' } },
  { outputText: { year: '2025', description: 'joined aws cloud innovation center, first on the east coast, connections paid off' } },
  { outputText: { year: '2025', description: 'smart outreach hub, first open-source project, pitched to business audiences' } },
  { outputText: { year: '2025', description: 'hackathon, built for the disabled community' } },
  { outputText: { year: '2025', description: 'devhouse sf, top 100 builders, shipped an AI assistant in 7 days' } },
  { outputText: { year: '2026', description: 'tartanhacks, 2nd best AI for decision support, 24 hours no sleep' } },
  { outputText: { year: '2026', description: 'columbia hackathon, ai for good, kept the streak going' } },
  { outputText: { year: '2026', description: 'flew from pittsburgh to sf, google deepmind x instalily ai hackathon, shipped in 8 hours, top 6 finalist' } },
  { outputText: { year: '2026', description: 'built phi deidentification solution, second open-source at aws cic' } },
  { outputText: { year: 'now', description: 'still building at forefront of AI, never stopping' } },
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
