import i18next from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  tr: {
    translation: {
      welcome: 'Merhaba, ben',
      about: "Gıda mühendisliği mezunu olup yazılım dünyasına adım atan bir Frontend Developer'ım. Artık ürün analizleri değil, web performansını iyileştiriyorum. HTML, CSS ve JavaScript'in yanı sıra React ve Next.js kullanarak modern ve dinamik projeler kodluyorum. Backend tarafındaki ihtiyaçlarımı Supabase ile karşılıyor, verileri yönetirken güçlü ve ölçeklenebilir çözümler üretiyorum. Yeniliklere ve gelişime her zaman açık biri olarak, teknolojiyi takip eder ve kendimi sürekli ileriye taşımaya çalışıyorum",
      menuBox:['Anasayfa','Hakkımda','Projeler','İletişim'],
      introduction: ["G", "İ", "R", "İ", "Ş"],
      education: ["E", "Ğ", "İ", "T", "İ", "M"],
      skills: ["Y", "E", "T", "E", "N", "E", "K", "L", "E", "R"],
      projects: ["P", "R", "O", "J", "E", "L", "E", "R"],
      code: "Kod",
      project: "Proje",
      footerText: "Eğer aklınızda bir proje fikri varsa veya projelerim hakkında daha fazla bilgi almak istiyorsanız, bana e-posta adresim veya sosyal medya hesaplarım üzerinden ulaşabilirsiniz. Size yardımcı olmaktan memnuniyet duyarım!",
      me: '',
      contact: 'Bana Ulaşın',
      school1: "Balıkesir Üniversite",
      school2: "Nişantaşı Üniversite Acunmedya Akademi",
      fe: "Gıda Mühendisliği",
      inovatim: "İnovatim inovasyon yarışması - ilk 10",


    }
  },
  en: {
    translation: {
      welcome: "Hi There, I'm",
      about: "I am a Frontend Developer who graduated in Food Engineering and stepped into the world of software development. Instead of product analysis, now i focus on improving web performance. I develop modern and dynamic projects using HTML, CSS, and JavaScript, along with React and Next.js. I meet my backend needs with Supabase, providing robust and scalable solutions for data management. Always open to innovation and growth, I keep up with technology and continuously strive to advance myself.",
      menuBox:['Home','About','Projects','Contact'],
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