import { createRoot } from 'react-dom/client'
import './reset.css'
import App from './App.jsx'

// StrictMode kapalı: efektler iki kez çalışınca yazı makinesi ve scroll dinleyicisi çift kuruluyor
createRoot(document.getElementById('root')).render(<App />)
