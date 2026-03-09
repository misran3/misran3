import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Project {
  id: number
  name: string
  description: string
  tags: string[]
  size: 'small' | 'medium' | 'large'
  rotation: number
  gridArea: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Ark',
    description: 'Multi-agent AI for financial threat detection',
    tags: ['Pydantic AI', 'AWS Lambda', 'Bedrock'],
    size: 'large',
    rotation: -2,
    gridArea: 'ark',
  },
  {
    id: 2,
    name: 'CatchLog',
    description: 'On-device AI for fishing compliance, zero connectivity',
    tags: ['PaliGemma', 'Edge AI', 'Python'],
    size: 'medium',
    rotation: 1.5,
    gridArea: 'catchlog',
  },
  {
    id: 3,
    name: 'Valkyrie-FS',
    description: 'FUSE filesystem, 13x faster S3 reads',
    tags: ['C++', 'FUSE', 'Linux'],
    size: 'small',
    rotation: -1,
    gridArea: 'valkyrie',
  },
  {
    id: 4,
    name: 'Smart Outreach',
    description: 'AI sales agent automating 30K+ outreach',
    tags: ['React', 'Lambda', 'DynamoDB'],
    size: 'medium',
    rotation: 2.5,
    gridArea: 'outreach',
  },
  {
    id: 5,
    name: 'PHI Pipeline',
    description: 'Clinical notes processing, 99% F1 accuracy',
    tags: ['Python', 'Bedrock', 'SQS'],
    size: 'large',
    rotation: -1.5,
    gridArea: 'phi',
  },
  {
    id: 6,
    name: 'User Rec',
    description: '200M tweets, 10K requests/sec',
    tags: ['PySpark', 'Go', 'Kubernetes'],
    size: 'small',
    rotation: 2,
    gridArea: 'userrec',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Trigger when 20% of section is in viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  })

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const headerVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const panelVariants = {
    hidden: (custom: Project) => ({
      opacity: 0,
      y: 80,
      rotate: custom.rotation + 8,
      scale: 0.85,
    }),
    visible: (custom: Project) => ({
      opacity: 1,
      y: 0,
      rotate: custom.rotation,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  }

  const animationState = prefersReducedMotion
    ? 'visible'
    : isInView
      ? 'visible'
      : 'hidden'

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      {/* Background elements */}
      <div className="projects-halftone" aria-hidden="true" />
      <div className="projects-gradient" aria-hidden="true" />

      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={animationState}
      >
        {/* Header */}
        <motion.header className="projects-header" variants={headerVariants}>
          <h2 className="projects-heading">Things I've built</h2>
        </motion.header>

        {/* Comic Panel Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`projects-panel projects-panel--${project.size}`}
              custom={project}
              variants={panelVariants}
              onMouseEnter={() => setHoveredPanel(project.id)}
              onMouseLeave={() => setHoveredPanel(null)}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.03,
                      rotate: project.rotation * 0.3,
                      zIndex: 10,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      },
                    }
              }
              style={{
                '--panel-rotation': `${project.rotation}deg`,
                '--panel-index': index,
                gridArea: project.gridArea,
              } as React.CSSProperties}
            >
              {/* Halftone overlay for each panel */}
              <div className="projects-panel__halftone" aria-hidden="true" />

              {/* Glow effect */}
              <div
                className={`projects-panel__glow ${hoveredPanel === project.id ? 'projects-panel__glow--active' : ''}`}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="projects-panel__content">
                <h3 className="projects-panel__name">{project.name}</h3>
                <p className="projects-panel__description">{project.description}</p>

                <div className="projects-panel__tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="projects-panel__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner accents for comic book feel */}
              <div className="projects-panel__corner projects-panel__corner--tl" aria-hidden="true" />
              <div className="projects-panel__corner projects-panel__corner--br" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
