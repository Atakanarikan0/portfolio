import i18next from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  tr: {
    translation: {
      welcome: 'Merhaba, ben',
      about: "Gıda mühendisliği mezunu olup yazılım dünyasına adım atan bir Frontend Developer'ım. Artık ürün analizleri değil, web performansını iyileştiriyorum. HTML, CSS ve JavaScript'in yanı sıra React ve Next.js kullanarak modern ve dinamik projeler geliştiriyorum. Backend tarafındaki ihtiyaçlarımı Supabase ile karşılıyorum. Yeniliklere, yeni diller öğrenmeye ve gelişime her zaman açık biri olarak teknolojiyi takip ediyor, kendimi sürekli ileriye taşımaya çalışıyorum. Yazılım alanındaki hedeflerim ise, uzman bir frontend developer olduktan sonra kendimi mobil alanda geliştirmek.",
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
      about: "I am a Frontend Developer who graduated in Food Engineering and stepped into the world of software development. Instead of product analysis, now i focus on improving web performance. I develop modern and dynamic projects using HTML, CSS, and JavaScript, along with React and Next.js. I handle my backend needs with Supabase.As someone who is always open to innovations, learning new languages, and development, I follow technology and constantly strive to improve myself. My goal in software development is to become an expert frontend developer and then further develop myself in the mobile field.",
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