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
    hidden: {
      opacity: 0,
      x: -20,
      filter: 'blur(8px)',
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
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
