import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProjectLink {
  github?: string
  live?: string
}

interface Project {
  id: number
  name: string
  description: string
  tags: string[]
  links?: ProjectLink
  featured: boolean
  rotation: number
}

const featuredProjects: Project[] = [
  {
    id: 1,
    name: 'Ark',
    description: 'Multi-agent AI for real-time financial threat detection. 2nd place at TartanHacks.',
    tags: ['Hackathon', 'Pydantic AI', 'Lambda', 'Bedrock', 'DynamoDB'],
    links: { github: 'https://github.com/misran3/ark' },
    featured: true,
    rotation: -2,
  },
  {
    id: 2,
    name: 'CatchLog',
    description: 'On-device AI for fishing compliance — classifies species 200 miles offshore with zero connectivity. Top 6 at Google DeepMind x InstaLILY.',
    tags: ['Hackathon', 'PaliGemma 2', 'Edge AI', 'Python'],
    links: { github: 'https://github.com/misran3/catchlog' },
    featured: true,
    rotation: 1.5,
  },
  {
    id: 3,
    name: 'Smart Outreach Hub',
    description: 'AI sales agent automating SMS outreach to 30K+ prospects. Built at AWS Cloud Innovation Center.',
    tags: ['Open Source', 'React', 'Lambda', 'DynamoDB'],
    links: { github: 'https://github.com/pitt-cic/smart-outreach-hub' },
    featured: true,
    rotation: 2.5,
  },
  {
    id: 4,
    name: 'PHI Deidentification',
    description: 'Clinical notes processing pipeline with 99% F1 accuracy. Scales to 1M+ documents.',
    tags: ['Open Source', 'Python', 'Bedrock', 'SQS', 'Lambda'],
    links: { github: 'https://github.com/pitt-cic/phi-deidentification' },
    featured: true,
    rotation: -1.5,
  },
  {
    id: 5,
    name: 'User Rec System',
    description: 'Distributed ETL pipeline processing 200M tweets. Go microservices serving 10K requests/sec.',
    tags: ['PySpark', 'Go', 'Kubernetes', 'gRPC'],
    links: undefined,
    featured: true,
    rotation: 2,
  },
  {
    id: 6,
    name: 'Database Migration',
    description: 'Replay testing framework to migrate 7TB on-prem database to Aurora with zero data loss.',
    tags: ['Python', 'Aurora', 'MySQL', 'Testing'],
    links: undefined,
    featured: true,
    rotation: -1,
  },
]

const moreProjects: Project[] = [
  {
    id: 7,
    name: 'Valkyrie-FS',
    description: 'FUSE filesystem achieving 13.6x faster S3 reads for ML training workloads.',
    tags: ['C++', 'FUSE', 'Linux', 'S3'],
    links: { github: 'https://github.com/misran3/valkyrie-fs' },
    featured: false,
    rotation: 1,
  },
  {
    id: 8,
    name: 'NoComelon',
    description: "Turns your kid's drawings into narrated, animated storybooks. Columbia AI for Good Hackathon.",
    tags: ['Hackathon', 'FastAPI', 'React', 'GPT-4o', 'ElevenLabs'],
    links: {
      github: 'https://github.com/misran3/nocomelon',
      live: 'https://misran3.github.io/nocomelon/',
    },
    featured: false,
    rotation: -1.5,
  },
  {
    id: 9,
    name: 'NYC Scout',
    description: 'RAG pipeline for NYC landmarks with XGBoost taxi fare prediction.',
    tags: ['Python', 'LangChain', 'LangGraph', 'Flask'],
    links: { github: 'https://github.com/misran3/nyc-scout' },
    featured: false,
    rotation: 2,
  },
  {
    id: 10,
    name: 'NexPlace',
    description: 'Multi-store system processing 175K+ businesses with sub-100ms geospatial queries.',
    tags: ['Java', 'Spring Boot', 'Cosmos DB', 'Redis'],
    links: { github: 'https://github.com/misran3/nex-place' },
    featured: false,
    rotation: -2,
  },
  {
    id: 11,
    name: 'Social Network Analysis',
    description: 'Distributed graph analytics processing Twitter social network on 5-node EMR cluster.',
    tags: ['Spark', 'Scala', 'EMR', 'S3'],
    links: { github: 'https://github.com/misran3/twitter-social-network-analysis' },
    featured: false,
    rotation: 1.5,
  },
  {
    id: 12,
    name: 'VerseVibe',
    description: 'Elasticsearch search engine indexing 5M songs with custom analyzers.',
    tags: ['Spring Boot', 'Elasticsearch', 'Hibernate', 'React'],
    links: { github: 'https://github.com/misran3/verse-vibe' },
    featured: false,
    rotation: -1,
  },
  {
    id: 13,
    name: 'Pitt Digital Work',
    description: 'Reengineered data ingestion from sync to async — 85% faster processing.',
    tags: ['Lambda', 'Python', 'Testing', 'AWS'],
    links: undefined,
    featured: false,
    rotation: 2.5,
  },
  {
    id: 14,
    name: 'Kickdrum Projects',
    description: 'Okta integration for 50K users, Terraform migrations, IoT firmware updates.',
    tags: ['Okta', 'Terraform', 'AWS', 'IoT'],
    links: undefined,
    featured: false,
    rotation: -2.5,
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const glitchVariants = {
    hidden: (custom: { index: number; rotation: number }) => ({
      opacity: 0,
      x: -20,
      filter: 'blur(8px)',
      rotate: custom.rotation + 8,
    }),
    visible: (custom: { index: number; rotation: number }) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      rotate: custom.rotation,
      transition: {
        duration: 0.4,
        delay: custom.index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  }

  const animationState = prefersReducedMotion
    ? 'visible'
    : isInView
      ? 'visible'
      : 'hidden'

  const getTagClassName = (tag: string) => {
    const base = 'projects-panel__tag'
    if (tag === 'Hackathon') return `${base} projects-panel__tag--hackathon`
    if (tag === 'Open Source') return `${base} projects-panel__tag--opensource`
    return base
  }

  const renderProjectCard = (project: Project, index: number, useGlitch = false) => (
    <motion.article
      key={project.id}
      className="projects-panel"
      custom={useGlitch ? { index, rotation: project.rotation } : project}
      variants={useGlitch ? glitchVariants : panelVariants}
      initial="hidden"
      animate={isExpanded || !useGlitch ? animationState : 'hidden'}
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
      } as React.CSSProperties}
    >
      {/* Halftone overlay */}
      <div className="projects-panel__halftone" aria-hidden="true" />

      {/* Glow effect */}
      <div
        className={`projects-panel__glow ${hoveredPanel === project.id ? 'projects-panel__glow--active' : ''}`}
        aria-hidden="true"
      />

      {/* Link icons - top right */}
      <div className="projects-panel__icons">
        {project.links ? (
          <>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-panel__icon"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} GitHub repository`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-panel__icon"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} live demo`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </>
        ) : (
          <span className="projects-panel__icon projects-panel__icon--lock" aria-label="Private project">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
            </svg>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="projects-panel__content">
        <h3 className="projects-panel__name">{project.name}</h3>
        <p className="projects-panel__description">{project.description}</p>

        <div className="projects-panel__tags">
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={getTagClassName(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )

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

        {/* Featured Projects Grid */}
        <div className="projects-grid">
          {featuredProjects.map((project, index) => renderProjectCard(project, index, false))}
        </div>

        {/* View All Button - only when collapsed */}
        {!isExpanded && (
          <motion.button
            className="projects-view-all"
            onClick={() => setIsExpanded(true)}
            variants={headerVariants}
          >
            <span className="projects-view-all__text">See more</span>
          </motion.button>
        )}

        {/* Expanded Projects Grid */}
        {isExpanded && (
          <motion.div
            className="projects-grid projects-grid--expanded"
            initial="hidden"
            animate="visible"
          >
            {moreProjects.map((project, index) => renderProjectCard(project, index, true))}
          </motion.div>
        )}

        {/* Show Less Button - only when expanded, after the grid */}
        {isExpanded && (
          <motion.button
            className="projects-view-all"
            onClick={() => setIsExpanded(false)}
            variants={headerVariants}
          >
            <span className="projects-view-all__text">Show less</span>
          </motion.button>
        )}
      </motion.div>
    </section>
  )
}
