import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Now() {
  const sectionRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Trigger when 30% of section is in viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  })

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const markerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const quoteVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const subtextVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const animationState = prefersReducedMotion
    ? 'visible'
    : isInView
      ? 'visible'
      : 'hidden'

  return (
    <section ref={sectionRef} id="now" className="now-section">
      {/* Animated gradient orb */}
      <div
        className={`now-orb ${prefersReducedMotion ? 'now-orb--static' : ''}`}
        aria-hidden="true"
      />

      {/* Subtle halftone texture */}
      <div className="now-halftone" aria-hidden="true" />

      <motion.div
        className="now-container"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        {/* Section marker */}
        <motion.span className="now-marker" variants={markerVariants}>
          04
        </motion.span>

        {/* Main quote */}
        <motion.blockquote className="now-quote" variants={quoteVariants}>
          <p className="now-quote__text">
            Currently building{' '}
            <span className="now-quote__highlight">AI agents</span> at AWS Cloud
            Innovation Center, exploring what's possible at the edge of{' '}
            <span className="now-quote__highlight--alt">code</span> and{' '}
            <span className="now-quote__highlight">intelligence</span>.
          </p>
        </motion.blockquote>

        {/* Subtext */}
        <motion.p className="now-subtext" variants={subtextVariants}>
          Pittsburgh, PA
        </motion.p>
      </motion.div>
    </section>
  )
}
