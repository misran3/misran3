import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CraftItem {
  id: number
  title: string
  description: string
  rotation: number
  hoverX: number
  hoverY: number
}

const craftItems: CraftItem[] = [
  // Column 1
  {
    id: 1,
    title: 'AI Agents',
    description: 'Autonomous intelligence at scale',
    rotation: -2.5,
    hoverX: -8,
    hoverY: -6,
  },
  {
    id: 2,
    title: 'Cloud-Native',
    description: 'Containers, serverless, or hybrid',
    rotation: 2,
    hoverX: 10,
    hoverY: -4,
  },
  {
    id: 3,
    title: 'Microservices',
    description: 'Decoupled, resilient backends',
    rotation: -1.5,
    hoverX: -6,
    hoverY: -8,
  },
  {
    id: 4,
    title: 'Scalable Systems',
    description: 'From zero to millions',
    rotation: 3,
    hoverX: 8,
    hoverY: -5,
  },
  {
    id: 5,
    title: 'Event-Driven Systems',
    description: 'Async, loosely coupled flows',
    rotation: -2,
    hoverX: -6,
    hoverY: -5,
  },
  // Column 2
  {
    id: 6,
    title: 'Data-Driven Applications',
    description: 'Pipelines that power decisions',
    rotation: 1.5,
    hoverX: 8,
    hoverY: -6,
  },
  {
    id: 7,
    title: 'Developer Tools',
    description: 'Making devs more productive',
    rotation: -3,
    hoverX: -8,
    hoverY: -4,
  },
  {
    id: 8,
    title: 'Infrastructure as Code',
    description: 'Automated, repeatable deploys',
    rotation: 2.5,
    hoverX: 6,
    hoverY: -7,
  },
  {
    id: 9,
    title: 'Interactive UIs',
    description: 'Polished, intuitive frontends',
    rotation: -1,
    hoverX: -5,
    hoverY: -6,
  },
  {
    id: 10,
    title: 'End-to-End Products',
    description: 'Backend to UI to infra—I own it all',
    rotation: 2,
    hoverX: 7,
    hoverY: -5,
  },
]

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Trigger when 30% of section is in viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  })

  // Animation variants for stagger reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const markerVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const headingVariants = {
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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const cardVariants = {
    hidden: (custom: CraftItem) => ({
      opacity: 0,
      y: 60,
      rotate: custom.rotation + 5,
      filter: 'blur(4px)',
    }),
    visible: (custom: CraftItem) => ({
      opacity: 1,
      y: 0,
      rotate: custom.rotation,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  }

  // For reduced motion, show content immediately
  const animationState = prefersReducedMotion
    ? 'visible'
    : isInView
      ? 'visible'
      : 'hidden'

  return (
    <section ref={sectionRef} id="craft" className="craft-section">
      {/* Gradient mesh background */}
      <div className="craft-gradient-mesh" aria-hidden="true">
        <div className="craft-gradient-orb craft-gradient-orb--1" />
        <div className="craft-gradient-orb craft-gradient-orb--2" />
        <div className="craft-gradient-orb craft-gradient-orb--3" />
      </div>

      {/* Subtle halftone overlay */}
      <div className="craft-halftone" aria-hidden="true" />

      <motion.div
        className="craft-container"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        {/* Left column: Marker and Heading */}
        <div className="craft-left">
          <motion.span className="craft-marker" variants={markerVariants}>
            02
          </motion.span>

          <motion.h2 className="craft-heading" variants={headingVariants}>
            What I<br />
            <span className="craft-heading--accent">build</span>
          </motion.h2>
        </div>

        {/* Right column: Skewed cards */}
        <div className="craft-right">
          <div className="craft-cards">
            {craftItems.map((item, index) => (
              <motion.article
                key={item.id}
                className={`craft-card ${hoveredCard === item.id ? 'craft-card--hovered' : ''}`}
                custom={item}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: item.hoverX,
                        y: item.hoverY,
                        rotate: item.rotation * 0.5,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }
                }
                style={{
                  '--card-rotation': `${item.rotation}deg`,
                  '--card-index': index,
                } as React.CSSProperties}
              >
                <div className="craft-card__content">
                  <h3 className="craft-card__title">{item.title}</h3>
                  <p className="craft-card__description">{item.description}</p>
                </div>
                <div className="craft-card__glow" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
