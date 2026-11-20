import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Trans, useTranslation } from 'react-i18next'
import './App.css'
import './Reel.css'
import './utils/i18n'
import { Footer, Reveal } from './App.jsx'
import { readTheme } from './utils/theme'
import { reel, socials, email } from './data/portfolio'

const EASE = [0.22, 1, 0.36, 1]

// Linkin türünü çözer: YouTube, Vimeo ya da doğrudan video dosyası
function parseVideo(url) {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) {
    return {
      type: 'embed',
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      thumb: `https://i.ytimg.com/vi/${yt[1]}/maxresdefault.jpg`,
    }
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) {
    return { type: 'embed', src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`, thumb: null }
  }
  return { type: 'file', src: url, thumb: null }
}

function Reel() {
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
      <ReelNav theme={theme} setTheme={setTheme} />
      <main>
        <ReelHero />
        <Player />
        <ReelInfo />
        <ReelContact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

function ReelNav({ theme, setTheme }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nextLang = i18n.language === 'tr' ? 'en' : 'tr'

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="/" className="monogram" aria-label="Atakan Arıkan">
        A<i>A</i>
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="/">← {t('reel.back')}</a>
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

function ReelHero() {
  const { t } = useTranslation()

  return (
    <section className="reel-hero" id="top">
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <span>{t('reel.eyebrow')}</span>
        <span>{t('hero.location')}</span>
        <span className="status"><i className="pulse" />{t('reel.status')}</span>
      </motion.div>

      <h1 className="reel-title">
        <span className="mask">
          <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}>
            Show
          </motion.span>
        </span>
        <span className="mask">
          <motion.span className="italic" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}>
            reel
          </motion.span>
        </span>
      </h1>

      <motion.div
        className="reel-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      >
        <p className="hero-role">{t('reel.role')}</p>
        <p className="hero-lead">{t('reel.lead')}</p>
      </motion.div>
    </section>
  )
}

function Player() {
  const { t } = useTranslation()
  const video = parseVideo(reel.video)
  const poster = reel.poster || video?.thumb || ''
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (playing && video?.type === 'file') videoRef.current?.play()
  }, [playing, video?.type])

  let content
  if (!video) {
    content = <p className="reel-empty">{t('reel.soon')}</p>
  } else if (playing && video.type === 'embed') {
    content = (
      <iframe
        src={video.src}
        title="Showreel"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
      />
    )
  } else {
    content = (
      <>
        {video.type === 'file' ? (
          <video ref={videoRef} src={video.src} poster={poster || undefined} controls={playing} playsInline preload="metadata" />
        ) : (
          poster && <img src={poster} alt="" />
        )}
        {!playing && (
          <button className="reel-play" onClick={() => setPlaying(true)} aria-label={t('reel.playLabel')}>
            <span className="reel-play-btn">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
              <span>{t('reel.play')}</span>
            </span>
          </button>
        )}
      </>
    )
  }

  return (
    <section className="reel-stage">
      <motion.div
        className={`reel-frame ${video ? '' : 'is-empty'} ${video && reel.vertical ? 'is-vertical' : ''}`}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
      >
        {content}
      </motion.div>
    </section>
  )
}

function ReelInfo() {
  const { t } = useTranslation()

  return (
    <section className="section reel-info">
      <div className="reel-info-row">
        <Reveal as="h2" className="block-title">{t('reel.tools')}</Reveal>
        <Reveal as="ul" className="reel-tools" delay={0.1}>
          {reel.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </Reveal>
      </div>
      <div className="reel-info-row">
        <Reveal as="h2" className="block-title">{t('reel.process')}</Reveal>
        <Reveal as="p" className="reel-process" delay={0.1}>{t('reel.processBody')}</Reveal>
      </div>
    </section>
  )
}

function ReelContact() {
  const { t } = useTranslation()
  const links = socials.filter((social) => social.label !== 'GitHub')

  return (
    <section className="section contact" id="contact">
      <Reveal as="h2" className="contact-title">
        <Trans i18nKey="reel.contactTitle" />
      </Reveal>
      <div className="contact-grid">
        <Reveal as="p" className="contact-body" delay={0.1}>{t('reel.contactBody')}</Reveal>
        <Reveal delay={0.2}>
          <a href={`mailto:${email}`} className="contact-email">{email}</a>
        </Reveal>
        <Reveal className="contact-links" delay={0.3}>
          {links.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} ↗</a>
          ))}
          <a href="/">{t('reel.web')} ↗</a>
          <a href={reel.cv} download={reel.cvFilename} className="cv-link">{t('reel.cv')} ↓</a>
        </Reveal>
      </div>
    </section>
  )
}

export default Reel
