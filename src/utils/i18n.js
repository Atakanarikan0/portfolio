import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
      nav: { work: "İşler", about: "Hakkımda", contact: "İletişim" },
      hero: {
        eyebrow: "Portfolyo — 2026",
        location: "İstanbul, Türkiye",
        status: "Yeni projelere açık",
        role: "Frontend Developer",
        lead: "Markalar için zarif, hızlı ve detaylarına özen gösterilmiş web deneyimleri tasarlayıp geliştiriyorum.",
        scroll: "Kaydır",
      },
      work: {
        label: "Seçili İşler",
        title: "Öne çıkan <i>işler</i>",
        visit: "Siteyi ziyaret et",
        archive: "Arşiv",
        archiveTitle: "Diğer <i>projeler</i>",
        live: "Canlı",
        code: "Kod",
        cols: { project: "Proje", stack: "Teknoloji", year: "Yıl" },
      },
      categories: {
        brand: "Marka Sitesi",
        app: "Web Uygulaması",
        game: "Oyun",
        ecommerce: "E-ticaret",
        tool: "Araç",
        landing: "Açılış Sayfası",
      },
      about: {
        label: "Hakkımda",
        statement: "Gıda mühendisliğinden <i>arayüz zanaatına</i>.",
        body: "Gıda mühendisliği mezunu olup yazılım dünyasına adım atan bir Frontend Developer'ım. Artık ürün analizleri değil, web performansını iyileştiriyorum. <hl>HTML</hl>, <hl>CSS</hl> ve <hl>JavaScript</hl>'in yanı sıra <hl>React</hl> ve <hl>Next.js</hl> kullanarak modern ve dinamik projeler geliştiriyorum. Backend tarafındaki ihtiyaçlarımı <hl>Supabase</hl> ile karşılıyorum. Hedefim, uzman bir frontend developer olduktan sonra kendimi mobil alanda geliştirmek.",
        education: "Eğitim",
        capabilities: "Yetkinlikler",
        learning: "Şu an öğreniyorum",
      },
      education: [
        { school: "Nişantaşı Üniversitesi Acunmedya Akademi", detail: "Front-End Web Development" },
        { school: "Balıkesir Üniversitesi", detail: "Gıda Mühendisliği", note: "İnovatim inovasyon yarışması — ilk 10 (2021 — 2023)" },
        { school: "Özel Altın Nesil Anadolu Lisesi", detail: "Lise" },
      ],
      contact: {
        label: "İletişim",
        title: "Birlikte <i>olağanüstü</i> bir şey yaratalım.",
        body: "Aklınızda bir proje varsa ya da işlerim hakkında konuşmak isterseniz, bir e-posta yeterli.",
        cv: "CV'yi indir",
      },
      footer: { rights: "Tüm hakları saklıdır.", top: "Başa dön", time: "İstanbul" },
      theme: { dark: "Koyu tema", light: "Açık tema" },
    },
  },
  en: {
    translation: {
      nav: { work: "Work", about: "About", contact: "Contact" },
      hero: {
        eyebrow: "Portfolio — 2026",
        location: "Istanbul, Türkiye",
        status: "Available for new projects",
        role: "Frontend Developer",
        lead: "I design and build refined, fast and meticulously crafted web experiences for brands.",
        scroll: "Scroll",
      },
      work: {
        label: "Selected Work",
        title: "Featured <i>work</i>",
        visit: "Visit site",
        archive: "Archive",
        archiveTitle: "More <i>projects</i>",
        live: "Live",
        code: "Code",
        cols: { project: "Project", stack: "Stack", year: "Year" },
      },
      categories: {
        brand: "Brand Website",
        app: "Web App",
        game: "Game",
        ecommerce: "E-commerce",
        tool: "Tool",
        landing: "Landing Page",
      },
      about: {
        label: "About",
        statement: "From food engineering to <i>interface craft</i>.",
        body: "I am a Frontend Developer who graduated in Food Engineering and stepped into the world of software development. Instead of product analysis, I now focus on improving web performance. <hl>HTML</hl>, <hl>CSS</hl>, and <hl>JavaScript</hl> are the core of what I use, along with <hl>React</hl> and <hl>Next.js</hl> to build modern and dynamic projects. I handle backend needs with <hl>Supabase</hl>. My goal is to become an expert frontend developer and later grow in mobile development.",
        education: "Education",
        capabilities: "Capabilities",
        learning: "Currently learning",
      },
      education: [
        { school: "Nisantasi University Acunmedya Academy", detail: "Front-End Web Development" },
        { school: "Balikesir University", detail: "Food Engineering", note: "İnovatim Innovation Competition — Top 10 (2021 — 2023)" },
        { school: "Özel Altın Nesil Anatolian High School", detail: "High School" },
      ],
      contact: {
        label: "Contact",
        title: "Let's create something <i>remarkable</i>.",
        body: "If you have a project in mind or would like to talk about my work, an email is all it takes.",
        cv: "Download CV",
      },
      footer: { rights: "All rights reserved.", top: "Back to top", time: "Istanbul" },
      theme: { dark: "Dark theme", light: "Light theme" },
    },
  },
};

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources,
  interpolation: { escapeValue: false },
});

export default i18next;
