import { useEffect, useRef, useState } from 'react'
import './App.css'
import { initializeTypewriter } from './utils/type-writer'
import { handleScroll } from './utils/scrollEffect'
import { motion } from "motion/react"
import './utils/i18n'
import { useTranslation } from 'react-i18next'

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const { t, i18n } = useTranslation()

  useEffect(() => {
    handleScroll()
    initializeTypewriter()
  }, [])

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Section reference is null");
    }
  };

  return (
    <>
      <div className="placeholder">
        <h5>
          A
          <br />
          T
          <br />
          A
          <br />
          K
          <br />
          A
          <br />
          N
        </h5>
      </div>
      <div className='container'>
        <Header scrollToSection={scrollToSection}
          section1Ref={section1Ref}
          section2Ref={section2Ref}
          section3Ref={section3Ref}
          section4Ref={section4Ref}
          i18n={i18n} t={t} />

        <HeaderContent i18n={i18n} t={t} />
        <MainContent
          section1Ref={section1Ref}
          section2Ref={section2Ref}
          section3Ref={section3Ref}
          i18n={i18n} t={t}
        />
        <Content section4Ref={section4Ref} i18n={i18n} t={t} />
      </div>
    </>
  )
}

function Header({ i18n, t, scrollToSection, section1Ref, section2Ref, section3Ref, section4Ref }) {
  const [language, setLanguage] = useState('en');
  const [flipped, setFlipped] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  // Dil değişim fonksiyonu
  const changeLanguage = async (lang) => {
    setFlipped(!flipped);
    await i18n.changeLanguage(lang)
    setTimeout(() => {
      setLanguage(lang);
    }, 100);
  };


  if (isDarkMode) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
  const handleScroll = (sectionRef, event) => {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionRefs = {
    "Anasayfa": section1Ref,
    "Hakkımda": section2Ref,
    "Projeler": section3Ref,
    "İletişim": section4Ref
  };
  return (
    <div className="header">

      <h1>Port<span>folio</span></h1>
      <ul className="desktop-menu__box">
        {t("menuBox", { returnObjects: true }).map((i, index) => (
          <li key={index}>
            <a href="#" onClick={(e) => handleScroll(sectionRefs[i], e)} className="menu__item">
              {i}
            </a>
          </li>
        ))}
      </ul>
      <div className="language-selector">
        <div
          className={`flag ${flipped ? 'flipped' : ''}`}
          onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
        >
          <img
            src="public/img/uk-flag.png"
            alt="English"
            style={{ display: language === 'en' ? 'block' : 'none' }}
          />
          <img
            src="public/img/turkey-flag.png"
            alt="Türkçe"
            style={{ display: language === 'tr' ? 'block' : 'none' }}
          />

        </div>
      </div>
      <button className="btn-container" onClick={() => setDarkMode(!isDarkMode)}>
        <div className={`sun ${!isDarkMode ? 'visible' : ''}`}></div>
        <div className={`moon ${isDarkMode ? 'visible' : ''}`}></div>
      </button>
      <div className="hamburger-menu">
        <input type="checkbox" id="menu__toggle" onClick={() => { setOpen(!isOpen); console.log(isOpen); }} />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className="menu__box" style={{ display: isOpen ? "block" : "none" }}>
          <li><a href="#" className="menu__item">Home</a></li>
          <li><a href="#" className="menu__item">About</a></li>
          <li><a href="#" className="menu__item">Project</a></li>
          <li><a href="#" className="menu__item">Contact</a></li>
          <span><a href="#" className='button'>CV<i className="fa-solid fa-download"></i><svg>
            <rect
              x="0" y="0"
              fill='none'
              width="100%"
              height="100%" />
          </svg></a></span>

        </ul>
      </div>

    </div>
  )
}
function HeaderContent({ i18n, t }) {
  return (
    <>
      <div className='header-content'>
        <div className="overlay"></div>
        <div className='text'>
          <h3><span className='small-size'>{t('welcome')} <br /></span>
            Atakan <span className='username'>Arıkan</span> <br /><span
              className="typewrite"
              data-period="1000"
              data-type='["Web Developer","Front-End Developer", "Freelancer"]'
            ></span>
          </h3>

        </div>
      </div>
      <div className='lg-header-content'>
        <div className="lg-text">
          <h3><span className='small-size'>{t('welcome')} <br /></span>
            Atakan <span className='username'>Arıkan</span> <br /><span
              className="typewrite"
              data-period="1000"
              data-type='["Web Developer","Front-End Developer", "Freelancer"]'
            ></span>
          </h3>
          <span><a href="#" className='button'>CV<i className="fa-solid fa-download"></i><svg>
            <rect
              x="0" y="0"
              fill='none'
              width="100%"
              height="100%" />
          </svg></a></span>
        </div>
        <div className="lg-img">
          <div className="home-avatar-box">
            <div className="home-avatar-in">
              <img src="./public/img/resim1.jpg" style={{ width: '526px', height: '526px' }} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function MainContent({ i18n, t, section2Ref, section3Ref }) {
  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  });

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        setVisibleSections((prev) => ({
          ...prev,
          [sectionId]: true,
        }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return (
    <section className='main-content'>
      <div ref={section2Ref} id='section1' className={`intro section ${visibleSections.section1 ? "right" : ""}`}>
        <div className="keyboard">
          {t("introduction", { returnObjects: true }).map((letter, index) => (
            <span className="key" key={index}>{letter}</span>
          ))}
        </div>
        <div className="border-bottom"></div>
        <p className='lead'>{t('about')}</p>
      </div>
      <div id='section2' className={`education section ${visibleSections.section2 ? "left" : ""}`}>
        <div className="keyboard">
          {t("education", { returnObjects: true }).map((letter, index) => (
            <span className="key" key={index}>{letter}</span>
          ))}
        </div>
        <div className="border-bottom"></div>
        <div className="card-container">
          <div className="panel">
            <div className="ring">
              <div className="card card1"></div>
              <div className="border">
                <p className="title">Özel Altın Nesil Anadolu Lisesi</p>
                <div className="slide">
                  <h6 className="para"></h6>
                </div>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="ring">
              <div className="card card2"></div>
              <div className="border">
                <p className="title">{t('school1')}</p>
                <div className="slide">
                  <h6 className="para">{t('fe')}</h6>
                  <p>{t('inovatim')}<br />(2021 - 2023)</p>

                </div>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="ring">
              <div className="card card3"></div>
              <div className="border">
                <p className="title">{t('school2')}</p>
                <div className="slide">
                  <h6 className="para">Front-End Web Development</h6>
                  <div>
                    <p>Html</p>
                    <p>Css</p>
                    <p>JavaScript</p>
                    <p>React</p>
                    <p>Supabase</p>
                    <p>Next.js</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='section3' className={`skills-box section ${visibleSections.section3 ? "fade" : ""}`}>
      <div className="keyboard">
          {t("skills", { returnObjects: true }).map((letter, index) => (
            <span className="key" key={index}>{letter}</span>
          ))}
        </div>
        <div className="border-bottom"></div>
        <div className='skills'>
          <div className="skill">
            <img src="/public/img/html-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/css-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/javascript-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/react-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/bootstrap-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/nextjs-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/supabase-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/figma-icon.svg" alt="" />
          </div>
          <div className="skill">
            <img src="/public/img/git-icon.svg" alt="" />
          </div>
        </div>

      </div>
      <div ref={section3Ref} id='section4' className="projects-box">
      <div className="keyboard">
          {t("projects", { returnObjects: true }).map((letter, index) => (
            <span className="key" key={index}>{letter}</span>
          ))}
        </div>
        <div className="border-bottom"></div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="row"
        >
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-a">
                <h1>Kanban</h1>
                <div className="card-back">
                  <a href="https://atakan-berna-ece-g-kdeniz-kanban-task.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/200found-kanban-task">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-b">
                <h1>Audiophile</h1>
                <div className="card-back">
                  <a href="https://kamp-zodyak-flame.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/kamp-zodyak">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-c">
                <h1>Entertainment<br />App</h1>
                <div className="card-back">
                  <a href="https://entertainment-app-react-iri5.vercel.app/#/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/entertainment-app-react">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-d">
                <h1>Where in the World</h1>
                <div className="card-back">
                  <a href="https://react-countries-app-xi.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/react-countries-app">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-e">
                <h1>Desserts<br />App</h1>
                <div className="card-back">
                  <a href="https://react-product-list-with-cart-toxx.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/react-product-list-with-cart">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-f">
                <h1>DevJobs<br />App</h1>
                <div className="card-back">
                  <a href="https://devjobs-web-app-ecru.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/devjobs-web-app">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-g">
                <h1>Mortgage<br />Calculator</h1>
                <div className="card-back">
                  <a href="https://mortgage-calculator-flax-two.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/mortgage-calculator">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-h">
                <h1>Quiz<br />App</h1>
                <div className="card-back">
                  <a href="https://quiz-app-js-ochre.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/quiz-app-js">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="card">
              <div className="cover item-i">
                <h1>Landing<br />Page</h1>
                <div className="card-back">
                  <a href="https://ortak-git-calismasi.vercel.app/">{t('project')}</a>
                  <a href="https://github.com/Atakanarikan0/ortak-git-calismasi">{t('code')}</a>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>

  )
}
function Content({ i18n, t, section4Ref }) {
  return (
    <footer ref={section4Ref}>
      <div className="footer-text">
        <h2>{t('contact')} <strong>{t('me')}</strong></h2>
        <span>{t('footerText')}</span>
      </div>
      <div className="social-media">
        <a href="https://www.linkedin.com/in/atakan-arikan-677b8a247/"><i className="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/Atakanarikan0"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.instagram.com/atakan.arikann"><i className="fa-brands fa-instagram"></i></a>
        <a href="mailto:atakarkn0@outlook.com"><i className="fa-solid fa-envelope"></i></a>
      </div>

    </footer>
  )
}

export default App
