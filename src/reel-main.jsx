import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import i18n from './utils/i18n'
import './reset.css'
import Reel from './Reel.jsx'

// Showreel linki çoğunlukla Türkçe CV'den açılacak: tarayıcı dili Türkçeyse sayfa Türkçe açılsın
try {
  if (navigator.language?.toLowerCase().startsWith('tr')) i18n.changeLanguage('tr')
} catch {
  // navigator yoksa varsayılan dil kalır
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Reel />
  </StrictMode>,
)
