import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Trans, useTranslation } from 'react-i18next'
import './App.css'
import './utils/i18n'
import { projects, skills, socials, email } from './data/portfolio'

const EASE = [0.22, 1, 0.36, 1]

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
        <About />
        <Contact />
      </main>
      <Footer />
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
        <a href="#about">{t('nav.about')}</a>
        <a href="#contact">{t('nav.contact')}</a>
      </nav>
      <div className="nav-actions">
        <button className="text-btn" onClick={() => i18n.changeLanguage(nextLang)} aria-label={nextLang === 'tr' ? 'Türkçe' : 'English'}>
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
        transition={{ duration: 1.2, delay: 0.9 }}
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
      >
        <p className="hero-role">{t('hero.role')}</p>
        <p className="hero-lead">{t('hero.lead')}</p>
        <a href="#work" className="scroll-cue">
          <span>{t('hero.scroll')}</span>
          <span className="scroll-line" />
        </a>
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

function FeaturedWork() {
  const { t } = useTranslation()
  const featured = projects.filter((project) => project.featured)

  return (
    <section className="section" id="work">
      <div className="section-head">
        <SectionLabel index="01">{t('work.label')}</SectionLabel>
        <Reveal as="h2" className="section-title">
          <Trans i18nKey="work.title" />
        </Reveal>
        <Reveal className="section-count">{String(featured.length).padStart(2, '0')}</Reveal>
      </div>

      <div className="featured">
        {featured.map((project, index) => (
          <Reveal key={project.title} className={`featured-item featured-item--${index + 1}`}>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="featured-link">
              <div className="featured-media">
                <img src={project.image} alt={project.title} loading="lazy" />
                <span className="featured-cta">{t('work.visit')} ↗</span>
              </div>
              <div className="featured-info">
                <span className="featured-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <span className="featured-meta">{t(`categories.${project.category}`)}</span>
                <span className="featured-meta">{project.stack}</span>
                <span className="featured-meta">{project.year}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Archive() {
  const { t } = useTranslation()
  const archive = projects.filter((project) => !project.featured)
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
              <span className="archive-index">{String(index + 4).padStart(2, '0')}</span>
              <span className="archive-title">
                {project.title}
                <small>{t(`categories.${project.category}`)}</small>
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

function About() {
  const { t } = useTranslation()
  const education = t('education', { returnObjects: true })

  return (
    <section className="section about" id="about">
      <div className="section-head">
        <SectionLabel index="03">{t('about.label')}</SectionLabel>
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
              <h4>{t('about.education')}</h4>
              <ul className="edu-list">
                {education.map((item) => (
                  <li key={item.school}>
                    <span className="edu-school">{item.school}</span>
                    <span className="edu-detail">{item.detail}</span>
                    {item.note && <span className="edu-note">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="about-block" delay={0.25}>
              <h4>{t('about.capabilities')}</h4>
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
        <SectionLabel index="04">{t('contact.label')}</SectionLabel>
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
          <a href="/cv-portfolio.pdf" download="Atakan Arıkan CV.pdf" className="cv-link">{t('contact.cv')} ↓</a>
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

export default App
