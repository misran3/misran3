import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const controls = useAnimation()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Entrance animation sequence
  useEffect(() => {
    const sequence = async () => {
      if (prefersReducedMotion) {
        setIsLoaded(true)
        return
      }

      // Wait a beat, then start the glitch entrance
      await new Promise(resolve => setTimeout(resolve, 200))
      await controls.start('glitchIn')
      await controls.start('settle')
      setIsLoaded(true)
    }
    sequence()
  }, [controls, prefersReducedMotion])

  // Mouse tracking for reactive effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  // Calculate chromatic offset based on mouse proximity to center
  const getOffset = (baseOffset: number, intensity = 1) => {
    if (prefersReducedMotion) return { x: 0, y: 0 }

    const centerX = 0.5
    const centerY = 0.5
    const dx = mousePosition.x - centerX
    const dy = mousePosition.y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 0.7
    const normalizedDistance = Math.min(distance / maxDistance, 1)

    // Closer = more intense aberration
    const factor = (1 - normalizedDistance) * intensity * baseOffset

    return {
      x: dx * factor * 30,
      y: dy * factor * 20
    }
  }

  // Animation variants for entrance glitch
  const containerVariants = {
    hidden: { opacity: 0 },
    glitchIn: {
      opacity: 1,
      transition: { duration: 0.1 }
    },
    settle: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const mainTextVariants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0
    },
    glitchIn: {
      opacity: [0, 1, 1, 0.8, 1, 1],
      x: [0, -20, 15, -10, 5, 0],
      y: [0, 10, -8, 5, -3, 0],
      transition: {
        duration: 1.2,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeOut' as const
      }
    },
    settle: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.2 }
    }
  }

  const cyanLayerVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      y: -30
    },
    glitchIn: {
      opacity: [0, 0.9, 0.7, 0.85, 0.8],
      x: [-80, 20, -30, 10, -4],
      y: [-50, 15, -20, 8, -2],
      transition: {
        duration: 1.4,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeOut' as const
      }
    },
    settle: {
      opacity: 0.7,
      x: -4,
      y: -2,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }

  const pinkLayerVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      y: 30
    },
    glitchIn: {
      opacity: [0, 0.9, 0.7, 0.85, 0.8],
      x: [80, -20, 30, -10, 4],
      y: [50, -15, 20, -8, 2],
      transition: {
        duration: 1.4,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeOut' as const
      }
    },
    settle: {
      opacity: 0.7,
      x: 4,
      y: 2,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }

  const taglineVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)'
    },
    glitchIn: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
      transition: { duration: 0 }
    },
    settle: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    settle: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.8, duration: 0.6 }
    }
  }

  // Get reactive offsets for mouse interaction
  const cyanOffset = getOffset(1, 1.2)
  const pinkOffset = getOffset(1, 1.2)

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Halftone background pattern */}
      <div className="hero-halftone" aria-hidden="true" />

      {/* Gradient orbs for atmosphere */}
      <div className="hero-orb hero-orb--pink" aria-hidden="true" />
      <div className="hero-orb hero-orb--cyan" aria-hidden="true" />

      {/* Scan lines overlay */}
      <div className="hero-scanlines" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Main name with chromatic aberration */}
        <div className="hero-name-container">
          {/* Cyan layer (behind) */}
          <motion.h1
            className="hero-name hero-name--cyan"
            variants={cyanLayerVariants}
            style={isLoaded && !prefersReducedMotion ? {
              transform: `translate(${-4 + cyanOffset.x}px, ${-2 + cyanOffset.y}px)`
            } : undefined}
            aria-hidden="true"
          >
            MISRAN
          </motion.h1>

          {/* Pink layer (behind) */}
          <motion.h1
            className="hero-name hero-name--pink"
            variants={pinkLayerVariants}
            style={isLoaded && !prefersReducedMotion ? {
              transform: `translate(${4 - pinkOffset.x}px, ${2 - pinkOffset.y}px)`
            } : undefined}
            aria-hidden="true"
          >
            MISRAN
          </motion.h1>

          {/* Main white layer */}
          <motion.h1
            className="hero-name hero-name--main"
            variants={mainTextVariants}
          >
            MISRAN
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          variants={taglineVariants}
        >
          I build stuff
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={controls}
      >
        <span className="hero-scroll__text">Scroll</span>
        <div className="hero-scroll__line">
          <div className="hero-scroll__dot" />
        </div>
      </motion.div>
    </section>
  )
}
