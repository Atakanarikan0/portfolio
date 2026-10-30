import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Trans, useTranslation } from 'react-i18next'
import './App.css'
import './utils/i18n'
import { projects, skills, socials, email } from './data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const CV_PATH = '/Atakan-Arikan-CV.pdf'
const CV_FILENAME = 'Atakan-Arıkan-CV.pdf'

function readTheme() {
  try {
    return localStorage.getItem('theme') || 'dark'
  } catch {
    return 'dark'
  }
}

function App() {
  const { i18n } = useTranslation()
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // depolama kapalıysa tema sadece bu oturumda geçerli
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Marquee />
        <FeaturedWork />
        <Archive />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <CvButton />
    </MotionConfig>
  )
}

function Reveal({ children, delay = 0, className, as = 'div' }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

function SectionLabel({ index, children }) {
  return (
    <Reveal className="section-label">
      <span>({index})</span>
      <span>{children}</span>
    </Reveal>
  )
}

function Nav({ theme, setTheme }) {
  const { t, i18n } = useTranslation()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      setScrolled(y > 40)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nextLang = i18n.language === 'tr' ? 'en' : 'tr'

  return (
    <header className={`nav ${hidden ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="monogram" aria-label="Atakan Arıkan">
        A<i>A</i>
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#work">{t('nav.work')}</a>
        <a href="#experience">{t('nav.experience')}</a>
        <a href="#about">{t('nav.about')}</a>
        <a href="#contact">{t('nav.contact')}</a>
      </nav>
      <div className="nav-actions">
        <button className="text-btn" onClick={() => i18n.changeLanguage(nextLang)} aria-label={`EN/TR — ${t('lang')}`}>
          <span className={i18n.language === 'en' ? 'is-active' : ''}>EN</span>
          <span className="slash">/</span>
          <span className={i18n.language === 'tr' ? 'is-active' : ''}>TR</span>
        </button>
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
        >
          <span className="theme-dot" />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const { t } = useTranslation()
  const line = (text, delay, italic) => (
    <span className="mask">
      <motion.span
        className={italic ? 'italic' : undefined}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <span>{t('hero.eyebrow')}</span>
        <span>{t('hero.location')}</span>
        <span className="status"><i className="pulse" />{t('hero.status')}</span>
      </motion.div>

      <h1 className="hero-title">
        {line('Atakan', 0.1)}
        {line('Arıkan', 0.25, true)}
      </h1>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      >
        <p className="hero-role">{t('hero.role')}</p>
        <p className="hero-lead">{t('hero.lead')}</p>
      </motion.div>
    </section>
  )
}

function Marquee() {
  const items = [...skills, ...skills]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((skill, index) => (
          <span key={index}>
            {skill}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

// Ortada yuvarlak bir merkez, ondan çıkan dalların ucunda projeler.
// Bir projenin üzerine gelince proje büyür ve merkez o projenin detaylarını gösterir.
function orbitLayout(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((-90 + (i * 360) / count) * Math.PI) / 180
    return { x: 50 + 38 * Math.cos(angle), y: 50 + 37 * Math.sin(angle) }
  })
}

// Dal: merkez halkanın kenarından başlar, projenin kenarında biter; hafif kavislidir
function branchPath(node, size) {
  const cx = size.w / 2
  const cy = size.h / 2
  const nx = (node.x / 100) * size.w
  const ny = (node.y / 100) * size.h
  const len = Math.hypot(nx - cx, ny - cy) || 1
  const ux = (nx - cx) / len
  const uy = (ny - cy) / len
  const sx = cx + ux * (size.core / 2 + 22)
  const sy = cy + uy * (size.core / 2 + 22)
  const ex = nx - ux * (size.node / 2 + 10)
  const ey = ny - uy * (size.node / 2 + 10)
  const qx = (sx + ex) / 2 - uy * 28
  const qy = (sy + ey) / 2 + ux * 28
  return `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
}

function FeaturedWork() {
  const { t } = useTranslation()
  const featured = projects.filter((project) => project.featured)
  const layout = orbitLayout(featured.length)
  const [active, setActive] = useState(null)
  const current = active === null ? null : featured[active]
  const orbitRef = useRef(null)
  const [size, setSize] = useState(null)

  useEffect(() => {
    const el = orbitRef.current
    if (!el) return
    const measure = () => {
      const core = el.querySelector('.orbit-core')
      const thumb = el.querySelector('.orbit-thumb')
      setSize({ w: el.clientWidth, h: el.clientHeight, core: core?.offsetWidth || 0, node: thumb?.offsetWidth || 0 })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="work">
      <div className="section-head">
        <SectionLabel index="01">{t('work.label')}</SectionLabel>
        <Reveal as="h2" className="section-title">
          <Trans i18nKey="work.title" />
        </Reveal>
        <Reveal className="section-count">{String(featured.length).padStart(2, '0')}</Reveal>
      </div>

      <div ref={orbitRef} className={`orbit ${current ? 'has-active' : ''}`} onMouseLeave={() => setActive(null)}>
        {size && (
        <svg className="orbit-branches" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
          {layout.map((node, index) => (
            <motion.path
              key={index}
              d={branchPath(node, size)}
              className={active === index ? 'is-active' : undefined}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 + index * 0.12 }}
            />
          ))}
        </svg>
        )}

        <motion.div
          className="orbit-core"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <span className="orbit-ring" aria-hidden="true" />
          {current ? (
            <div className="orbit-core-content" key={current.key}>
              <span className="orbit-core-index">{String(active + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
              <h3 className="orbit-core-title">{current.title}</h3>
              <span className="orbit-core-meta">{t(`categories.${current.category}`)} · {current.year}</span>
              <p className="orbit-core-desc">{t(`projects.${current.key}`)}</p>
              <span className="orbit-core-stack">{current.stack}</span>
            </div>
          ) : (
            <div className="orbit-core-content is-idle" key="idle">
              <span className="orbit-core-count">{String(featured.length).padStart(2, '0')}</span>
              <span className="orbit-core-meta">{t('work.clientProjects')}</span>
              <span className="orbit-core-hint">{t('work.hoverHint')}</span>
            </div>
          )}
        </motion.div>

        {featured.map((project, index) => (
          <motion.a
            key={project.key}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`orbit-node ${active === index ? 'is-active' : ''} ${layout[index].y < 30 && Math.abs(layout[index].x - 50) < 20 ? 'orbit-node--side' : ''}`}
            style={{ '--x': `${layout[index].x}%`, '--y': `${layout[index].y}%` }}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 + index * 0.12 }}
          >
            <span className="orbit-thumb">
              <img src={project.image} alt="" loading="lazy" style={project.focus ? { objectPosition: project.focus } : undefined} />
            </span>
            <span className="orbit-label">
              <span className="orbit-title">{project.title}</span>
              <span className="orbit-meta">{t(`categories.${project.category}`)} · {project.year}</span>
              <span className="orbit-desc">{t(`projects.${project.key}`)}</span>
              <span className="orbit-visit">{t('work.visit')} ↗</span>
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function Archive() {
  const { t } = useTranslation()
  const archive = projects.filter((project) => !project.featured)
  const featuredCount = projects.length - archive.length
  const previewRef = useRef(null)
  const [active, setActive] = useState(null)

  const movePreview = (e) => {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${e.clientX + 32}px, ${e.clientY}px, 0) translateY(-50%)`
    }
  }

  return (
    <section className="section">
      <div className="section-head">
        <SectionLabel index="02">{t('work.archive')}</SectionLabel>
        <Reveal as="h2" className="section-title">
          <Trans i18nKey="work.archiveTitle" />
        </Reveal>
        <Reveal className="section-count">{String(archive.length).padStart(2, '0')}</Reveal>
      </div>

      <div className="archive" onMouseMove={movePreview} onMouseLeave={() => setActive(null)}>
        <div className="archive-row archive-head" aria-hidden="true">
          <span>N°</span>
          <span>{t('work.cols.project')}</span>
          <span>{t('work.cols.stack')}</span>
          <span>{t('work.cols.year')}</span>
          <span />
        </div>
        {archive.map((project, index) => (
          <Reveal key={project.title} className="archive-row" delay={Math.min(index * 0.03, 0.3)}>
            <div className="archive-hit" onMouseEnter={() => setActive(project)}>
              <span className="archive-index">{String(index + featuredCount + 1).padStart(2, '0')}</span>
              <span className="archive-title">
                {project.title}
                <small>
                  {t(`categories.${project.category}`)}
                  {project.key && <> · {t(`projects.${project.key}`)}</>}
                </small>
              </span>
              <span className="archive-stack">{project.stack}</span>
              <span className="archive-year">{project.year}</span>
              <span className="archive-links">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">{t('work.live')} ↗</a>
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">{t('work.code')} ↗</a>}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <div ref={previewRef} className={`archive-preview ${active ? 'is-visible' : ''}`} aria-hidden="true">
        {archive.map((project) => (
          <img
            key={project.title}
            src={project.image}
            alt=""
            loading="lazy"
            className={active?.title === project.title ? 'is-active' : ''}
          />
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const { t } = useTranslation()
  const stats = t('experience.stats', { returnObjects: true })
  const points = t('experience.points', { returnObjects: true })

  return (
    <section className="section experience" id="experience">
      <div className="section-head">
        <SectionLabel index="03">{t('experience.label')}</SectionLabel>
        <Reveal as="h2" className="section-title">
          <Trans i18nKey="experience.title" />
        </Reveal>
      </div>

      <div className="exp-grid">
        <Reveal className="exp-meta">
          <span className="exp-period">{t('experience.period')}</span>
          <h3 className="exp-role">{t('experience.role')}</h3>
          <span className="exp-clients">{t('experience.clients')}</span>
          <dl className="exp-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <ol className="exp-points">
          {points.map((point, index) => (
            <Reveal as="li" key={index} delay={index * 0.06}>
              <span className="exp-num">{String(index + 1).padStart(2, '0')}</span>
              <p>{point}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function About() {
  const { t } = useTranslation()
  const education = t('education', { returnObjects: true })

  return (
    <section className="section about" id="about">
      <div className="section-head">
        <SectionLabel index="04">{t('about.label')}</SectionLabel>
      </div>

      <div className="about-grid">
        <Reveal className="about-portrait">
          <div className="portrait-frame">
            <img src="/img/avatar.webp" alt="Atakan Arıkan" loading="lazy" />
          </div>
          <span className="portrait-caption">Atakan Arıkan — {t('hero.role')}</span>
        </Reveal>

        <div className="about-content">
          <Reveal as="h2" className="about-statement">
            <Trans i18nKey="about.statement" />
          </Reveal>
          <Reveal as="p" className="about-body" delay={0.1}>
            <Trans i18nKey="about.body" components={{ hl: <span className="hl" /> }} />
          </Reveal>

          <div className="about-columns">
            <Reveal className="about-block" delay={0.15}>
              <h3 className="block-title">{t('about.education')}</h3>
              <ul className="edu-list">
                {education.map((item) => (
                  <li key={item.school}>
                    {item.years && <span className="edu-years">{item.years}</span>}
                    <span className="edu-school">{item.school}</span>
                    <span className="edu-detail">{item.detail}</span>
                    {item.note && <span className="edu-note">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="about-block" delay={0.25}>
              <h3 className="block-title">{t('about.capabilities')}</h3>
              <ul className="cap-list">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p className="learning">
                <span>{t('about.learning')}</span> React Native
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useTranslation()
  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <SectionLabel index="05">{t('contact.label')}</SectionLabel>
      </div>
      <Reveal as="h2" className="contact-title">
        <Trans i18nKey="contact.title" />
      </Reveal>
      <div className="contact-grid">
        <Reveal as="p" className="contact-body" delay={0.1}>{t('contact.body')}</Reveal>
        <Reveal delay={0.2}>
          <a href={`mailto:${email}`} className="contact-email">{email}</a>
        </Reveal>
        <Reveal className="contact-links" delay={0.3}>
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} ↗</a>
          ))}
          <a href={CV_PATH} download={CV_FILENAME} className="cv-link">{t('contact.cv')} ↓</a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { t, i18n } = useTranslation()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString(i18n.language === 'tr' ? 'tr-TR' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  })

  return (
    <footer className="footer">
      <div className="footer-name" aria-hidden="true">Atakan <i>Arıkan</i></div>
      <div className="footer-row">
        <span>© {now.getFullYear()} Atakan Arıkan. {t('footer.rights')}</span>
        <span>{t('footer.time')} — {time}</span>
        <a href="#top">{t('footer.top')} ↑</a>
      </div>
    </footer>
  )
}

// Sağ altta sabit duran CV butonu; hover/focus olunca etiketi açılır
function CvButton() {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)
  // ilk giriş animasyonu gecikmeli, sonraki gizlenip görünmeler anında
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const targets = [document.getElementById('contact'), document.querySelector('.footer')].filter(Boolean)
    const visible = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)))
      setHidden(visible.size > 0)
    })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.a
      href={CV_PATH}
      download={CV_FILENAME}
      className={`cv-fab ${hidden ? 'is-hidden' : ''}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      aria-label={t('contact.cv')}
      initial={{ opacity: 0, y: 20 }}
      animate={hidden ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      transition={{ duration: ready ? 0.5 : 0.8, ease: EASE, delay: ready ? 0 : 1.4 }}
      onAnimationComplete={() => setReady(true)}
    >
      <span className="cv-fab-label">{t('contact.cv')}</span>
      <span className="cv-fab-short" aria-hidden="true">{t('contact.cvShort')}</span>
      <svg className="cv-fab-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 4v11m0 0-5-5m5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  )
}

export default App
