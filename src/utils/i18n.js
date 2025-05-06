import i18next from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  tr: {
    translation: {
      welcome: 'Merhaba, ben',
      about:"Gıda mühendisliği mezunu olup yazılım dünyasına adım atan bir Frontend Developer'ım. Artık ürün analizleri değil, web performansını iyileştiriyorum. <0>HTML</0>, <1>CSS</1> ve <2>JavaScript</2>'in yanı sıra <3>React</3> ve <4>Next.js</4> kullanarak modern ve dinamik projeler geliştiriyorum. Backend tarafındaki ihtiyaçlarımı <5>Supabase</5> ile karşılıyorum. Yeniliklere, yeni diller öğrenmeye ve gelişime her zaman açık biri olarak teknolojiyi takip ediyor, kendimi sürekli ileriye taşımaya çalışıyorum. Yazılım alanındaki hedeflerim ise, uzman bir frontend developer olduktan sonra kendimi mobil alanda geliştirmek.",
      introduction: ["G", "İ", "R", "İ", "Ş"],
      education: ["E", "Ğ", "İ", "T", "İ", "M"],
      skills: ["Y", "E", "T", "E", "N", "E", "K", "L", "E", "R"],
      projects: ["P", "R", "O", "J", "E", "L", "E", "R"],
      code: "Kod",
      project: "Proje",
      footerText: "Eğer aklınızda bir proje fikri varsa veya projelerim hakkında daha fazla bilgi almak istiyorsanız, bana e-posta adresim veya sosyal medya hesaplarım üzerinden ulaşabilirsiniz. Size yardımcı olmaktan memnuniyet duyarım!",
      me: '',
      contact: 'Bana Ulaşın',
      school1: "Balıkesir Üniversitesi",
      school2: "Nişantaşı Üniversitesi Acunmedya Akademi",
      fe: "Gıda Mühendisliği",
      inovatim: "İnovatim inovasyon yarışması - ilk 10",
      menuBox: [
        { key: "home", label: "Anasayfa" },
        { key: "about", label: "Hakkımda" },
        { key: "projects", label: "Projeler" },
        { key: "contact", label: "İletişim" }
      ]
      

    }
  },
  en: {
    translation: {
      welcome: "Hi There, I'm",
      about:"I am a Frontend Developer who graduated in Food Engineering and stepped into the world of software development. Instead of product analysis, now I focus on improving web performance. <0>HTML</0>, <1>CSS</1>, and <2>JavaScript</2> are the core of what I use, along with <3>React</3> and <4>Next.js</4> to build modern and dynamic projects. I handle backend needs with <5>Supabase</5>. Being always open to innovation, learning new languages, and self-improvement, I keep up with technology and strive to push myself forward. My goal is to become an expert frontend developer and later grow in mobile development.",
      introduction: ["I", "N", "T", "R", "O", "D", "U", "C", "T", "I", "O", "N"],
      education: ["E", "D", "U", "C", "A", "T", "I", "O", "N"],
      skills: ["S", "K", "I", "L", "L", "S"],
      projects: ["P", "R", "O", "J", "E", "C", "T", "S"],
      code: "Code",
      project: "Project",
      footerText: "If you have a project idea in mind or would like to learn more about my projects, feel free to contact me via my email address or social media accounts. I'm here to help!",
      me: 'Me !',
      contact: 'Contact',
      school1: "Balikesir University",
      school2: "Nisantasi University Acunmedya Academy",
      fe: "Food Engineer",  
      inovatim: "İnovatim Innovation Competition - Top 10",
      menuBox: [
        { key: "home", label: "Home" },
        { key: "about", label: "About" },
        { key: "projects", label: "Projects" },
        { key: "contact", label: "Contact" }
      ]
      

    }
  }
}

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources
  })


export default i18next