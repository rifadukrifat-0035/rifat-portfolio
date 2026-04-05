import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  ExternalLink,
  Globe2,
  Mail,
  Share2,
  FileText,
  Sparkles,
  Users,
  ChevronRight,
} from 'lucide-react'
import profileImage from './assets/profile.jpg'
import profileImage2 from './assets/profile2.jpg'
import gallery1 from './assets/1dN3y9YKEKv3_dvDPc15azDk0ImM4DoFw.jpg'
import gallery2 from './assets/1J96wvFxZFx3qRfBxN8zVK34mx9azfEfi.jpg'
import gallery3 from './assets/1t1xzmifsKrd4UTQjDwwEU5WPc586h2f0.jpg'
import gallery4 from './assets/1s_g4BbLeMa1HU1drQDz7RObjZfRt0pH3.jpg'
import geoplan1 from './assets/geoplan1.jpg'
import geoplan2 from './assets/geoplan2.jpg'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const stats = [
  { icon: Award, title: 'National 1st Runner-up', label: 'GEOPLAN 1.0' },
  { icon: Sparkles, title: 'International Speaker', label: 'Nalanda University, India' },
  { icon: Globe2, title: 'APA Student Member', label: 'American Planning Association' },
  { icon: FileText, title: 'Research Manuscript', label: 'XAI Monsoon Detection' },
  { icon: Users, title: 'BIP Conference Volunteer', label: '4th Intl. URP Conference' },
  { icon: Users, title: 'LinkedIn Community', label: '2,900+ followers' },
]

const projectGroups = {
  Planning: [
    {
      title: 'Rajshahi 2035 UHI',
      description: 'Analyzed 24 years of Landsat satellite data via GEE Python API. Discovered spectral hallucinations in AI classification. National 1st Runner-up at GEOPLAN 1.0.',
      techStack: ['GEE', 'ArcGIS', 'Landsat', 'Python'],
      link: 'https://storymaps.arcgis.com/stories/368d9e78234a4987b2f9390b06ddd579',
    },
  ],
  AI: [
    {
      title: 'BIP RAG Chatbot',
      description: 'Production RAG system for Bangladesh Institute of Planners. Zero monthly server cost, auto-updating CI/CD pipeline.',
      techStack: ['FastAPI', 'LangChain', 'GitHub Actions'],
      link: 'https://github.com/rifadukrifat-0035',
    },
    {
      title: 'Traffic Agent (YOLOv8 + Groq)',
      description: 'Real-time vehicle counting using YOLOv8 + ByteTrack. Groq LPU for instant AI analysis via Llama 3.1.',
      techStack: ['YOLOv8', 'ByteTrack', 'Groq', 'Streamlit'],
      link: 'https://github.com/rifadukrifat-0035',
    },
    {
      title: 'BERT QA System',
      description: 'Extractive Question Answering fine-tuned on SQuAD v1.1 dataset using bert-base-uncased. Transfer learning for NLP.',
      techStack: ['BERT', 'SQuAD v1.1', 'Transfer Learning', 'NLP'],
      link: 'https://github.com/rifadukrifat-0035',
    },
    {
      title: 'Multi-Agent Content System',
      description: 'LangGraph workflow with Tavily API research + Llama 3.3 70B writing + self-critique loop for content automation.',
      techStack: ['LangGraph', 'Tavily', 'Llama 3.3 70B'],
      link: 'https://github.com/rifadukrifat-0035',
    },
  ],
  Both: [
    {
      title: 'OmniGuard-AI: Flood Resilience Pipeline',
      description: 'Sentinel-1 SAR + NetworkX graph routing + Gemini 1.5 Flash Bengali emergency alerts. Validated on 2024 Kurigram flood.',
      techStack: ['Sentinel-1 SAR', 'NetworkX', 'Gemini 1.5 Flash'],
      link: 'https://github.com/rifadukrifat-0035',
    },
    {
      title: 'Automated Chatbot System',
      description: 'n8n + Google Gemini serverless workflow replacing static replies with dynamic AI. Deployed for real business client.',
      techStack: ['n8n', 'Google Gemini', 'Facebook API'],
      link: 'https://github.com/rifadukrifat-0035',
    },
  ],
}

const galleryPhotos = [
  {
    src: gallery1,
    caption: 'Presenting geospatial AI research at Nalanda University.',
  },
  {
    src: gallery2,
    caption: 'Engaged with international scholars on climate planning.',
  },
  {
    src: gallery3,
    caption: 'Professional conference presence showcasing planning expertise.',
  },
  {
    src: gallery4,
    caption: 'Strategic fieldwork and leadership moments in planning.',
  },
  {
    src: geoplan1,
    caption: 'GEOPLAN 1.0 Mapathon showcase with national award recognition.',
  },
  {
    src: geoplan2,
    caption: 'On-stage moment from GEOPLAN 1.0, featuring planning analytics and awards.',
  },
]

const skillGroups = [
  {
    heading: 'Geospatial',
    items: [
      'ArcGIS',
      'QGIS',
      'GEE',
      'Sentinel-1 SAR',
      'NDBI',
      'MNDWI',
      'NDVI',
      'LST',
      'AutoCAD',
    ],
  },
  {
    heading: 'AI & Automation',
    items: [
      'LangChain',
      'LangGraph',
      'Active RAG',
      'YOLOv8',
      'BERT',
      'Gemini',
      'Groq',
      'n8n',
    ],
  },
  {
    heading: 'Engineering',
    items: [
      'Python',
      'FastAPI',
      'Docker',
      'GitHub Actions',
      'Streamlit',
      'Render',
      'SQLAlchemy',
      'CI/CD',
    ],
  },
]

const timeline = [
  {
    date: 'Mar 2026',
    title: 'International Speaker',
    detail: 'Nalanda University, India',
    description: 'Presented geospatial AI research on Urban Heat Island at Nalanda University, India. Engaged global scholars on climate diplomacy.',
  },
  {
    date: 'Dec–Jan 2026',
    title: 'Winter Intern',
    detail: 'CROPC-IMD',
    description: 'Climate change & disaster resilience training under CROPC, IMD and Ministry of Earth Sciences, Government of India.',
  },
  {
    date: 'May 2025',
    title: 'Volunteer',
    detail: 'BIP 4th Intl. URP Conference',
    description: 'Assisted coordination at BIP 4th International Conference on Urban & Regional Planning, Dhaka.',
  },
]

const heroSubtext =
  'Urban Planning Researcher & AI Engineer — bridging Geospatial Intelligence with Climate Resilience'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  const [activeTab, setActiveTab] = useState('Planning')
  const [typedText, setTypedText] = useState('')
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)

  const profileImages = [profileImage, profileImage2]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypedText(heroSubtext.slice(0, index + 1))
      index += 1
      if (index >= heroSubtext.length) {
        clearInterval(interval)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const profileInterval = setInterval(() => {
      setCurrentProfileIndex((prev) => (prev + 1) % profileImages.length)
    }, 4000) // Change image every 4 seconds
    return () => clearInterval(profileInterval)
  }, [profileImages.length])

  const projectList = useMemo(() => projectGroups[activeTab], [activeTab])

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_25%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Md. Rifadul Islam Rifat</p>
            <p className="text-sm text-slate-300">Rajshahi, Bangladesh</p>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10">
            Contact
          </a>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <section id="home" className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:p-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
                  Urban Planning + AI Engineering
                </div>
                <div className="space-y-5">
                  <h1 className="text-5xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-6xl">
                    <span className="block text-[#10b981]">I Plan Cities.</span>
                    <span className="block text-[#3b82f6]">I Build Intelligence.</span>
                  </h1>
                  <p className="max-w-3xl whitespace-pre-wrap text-lg leading-8 text-slate-300 sm:text-xl">
                    {typedText}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-[#10b981] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    View Projects
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                  <a href="/Rifat_CV.pdf" download className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                    <FileText className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </div>
              </div>
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-1 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentProfileIndex}
                      src={profileImages[currentProfileIndex]}
                      alt="Md. Rifadul Islam Rifat professional portrait"
                      className="h-full w-full min-h-[420px] object-cover"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-6">
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Professional portrait</p>
                    <p className="mt-2 text-xl font-semibold text-white">Md. Rifadul Islam Rifat</p>
                    <p className="text-sm text-slate-300">Urban Planner • AI Engineer</p>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {profileImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProfileIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentProfileIndex
                            ? 'bg-emerald-400 scale-125'
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`View profile image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="gallery" className="mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.75 }}>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Professional Moments</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Portfolio & GEOPLAN Highlights</h2>
              <p className="mt-3 max-w-2xl text-slate-400">A polished showcase of conference leadership, research presentation, and GEOPLAN recognition.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {galleryPhotos.map((photo, index) => (
                <motion.article key={index} whileHover={{ y: -6 }} className="glass-card overflow-hidden p-0">
                  <img src={photo.src} alt={photo.caption} className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Nalanda University</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{photo.caption}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="about" className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }} className="glass-card glass-emerald p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-300">Urban Wing</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Urban & Regional Planning</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              B.Sc. URP student at PUST with deep practice in climate research, GIS-driven planning, and urban design.
            </p>
            <ul className="mt-8 space-y-4 text-slate-200">
              <li>• B.Sc. URP, PUST (Expected 2028)</li>
              <li>• APA Student Member</li>
              <li>• BIP Conference Volunteer</li>
              <li>• AutoCAD, Urban Design, Climate Research</li>
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="glass-card glass-blue p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300">AI Wing</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">AI Engineering</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Developing RAG systems, GeoAI models, and automation pipelines for climate-aware planning and disaster resilience.
            </p>
            <ul className="mt-8 space-y-4 text-slate-200">
              <li>• Active RAG & multi-agent systems</li>
              <li>• GeoAI: GEE, Sentinel-1 SAR, ArcGIS</li>
              <li>• Stack: Python, LangChain, YOLOv8, Docker</li>
            </ul>
          </motion.div>
        </section>

        <section className="mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Stats Bento Grid</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Highlights & achievements</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.article key={index} whileHover={{ y: -6 }} className="glass-card p-6 transition duration-300">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/70 text-[#10b981] shadow-[0_20px_50px_rgba(16,185,129,0.12)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-sm uppercase tracking-[0.24em] text-slate-400">{item.title}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{item.label}</p>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Projects</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Planning + AI Portfolio</h2>
              </div>
              <div className="inline-flex gap-2 rounded-full bg-slate-950/70 p-2">
                {Object.keys(projectGroups).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-[#10b981] to-[#3b82f6] text-slate-950 shadow-[0_20px_80px_rgba(16,185,129,0.18)]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projectList.map((project, index) => (
                <motion.article
                  key={`${project.title}-${index}`}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 transition duration-300"
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6 flex-grow">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors group"
                    >
                      View Project
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="skills" className="mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Skills</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Technical strengths</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.heading} className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-white">{group.heading}</h3>
                  <ul className="mt-5 space-y-3 text-slate-300">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Experience</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Timeline</h2>
            </div>
            <div className="space-y-5">
              {timeline.map((item) => (
                <article key={item.date} className="glass-card rounded-[28px] border-white/10 p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-slate-400">{item.date}</p>
                    <div className="h-px flex-1 bg-white/5 sm:mx-4" />
                    <p className="text-sm text-slate-300">{item.detail}</p>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-300 leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="mt-16 pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }} className="glass-card p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Let’s build the next climate-smart system together.</h2>
                <p className="mt-4 max-w-2xl text-slate-300">Reach out for collaboration, speaking engagements, or AI-enabled planning projects.</p>
              </div>
              <div className="space-y-3 text-slate-100">
                <a href="https://linkedin.com/in/rifadul-rifat" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-slate-100 transition hover:text-emerald-300">
                  <ExternalLink className="h-5 w-5 text-emerald-300" /> linkedin.com/in/rifadul-rifat
                </a>
                <a href="https://github.com/rifadukrifat-0035" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-slate-100 transition hover:text-sky-300">
                  <Share2 className="h-5 w-5 text-sky-300" /> github.com/rifadukrifat-0035
                </a>
                <a href="mailto:rifadukrifat@gmail.com" className="inline-flex items-center gap-3 text-sm text-slate-100 transition hover:text-emerald-300">
                  <Mail className="h-5 w-5 text-emerald-300" /> rifadukrifat@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/95 px-5 py-3 text-sm font-semibold text-slate-100 shadow-[0_30px_80px_rgba(16,185,129,0.18)] transition hover:-translate-y-1 hover:bg-slate-900/95"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">🤖</span>
        Ask Rifat's AI
      </motion.a>
    </div>
  )
}

export default App
