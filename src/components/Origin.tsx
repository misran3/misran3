import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Origin() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Trigger when 50% of section is in viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5
  })

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const markerVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const bodyVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  // For reduced motion, show content immediately
  const animationState = prefersReducedMotion ? 'visible' : (isInView ? 'visible' : 'hidden')

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="origin-section"
    >
      {/* Halftone texture continuation */}
      <div className="origin-halftone" aria-hidden="true" />

      {/* Subtle gradient accent */}
      <div className="origin-gradient" aria-hidden="true" />

      <motion.div
        className="origin-content"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        {/* Section marker */}
        <motion.span
          className="origin-marker"
          variants={markerVariants}
        >
          01
        </motion.span>

        {/* Heading */}
        <motion.h2
          className="origin-heading"
          variants={headingVariants}
        >
          Where it started
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="origin-body"
          variants={bodyVariants}
        >
          Bengaluru. Curiosity. Breaking things to understand how they worked.
        </motion.p>
      </motion.div>
    </section>
  )
}
