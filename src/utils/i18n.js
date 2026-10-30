import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
      nav: { work: "İşler", experience: "Deneyim", about: "Hakkımda", contact: "İletişim" },
      lang: "Dili değiştir",
      hero: {
        eyebrow: "Portfolyo — 2026",
        location: "Bursa, Türkiye · Uzaktan",
        status: "Tam zamanlı rollere ve freelance projelere açık",
        role: "Frontend Developer",
        lead: "Markalar için zarif, hızlı ve detaylarına özen gösterilmiş web deneyimleri tasarlayıp geliştiriyorum.",
      },
      work: {
        label: "Seçili İşler",
        title: "Öne çıkan <i>işler</i>",
        visit: "Siteyi ziyaret et",
        client: "Müşteri projesi",
        archive: "Arşiv",
        archiveTitle: "Diğer <i>projeler</i>",
        live: "Canlı",
        code: "Kod",
        cols: { project: "Proje", stack: "Teknoloji", year: "Yıl" },
      },
      projects: {
        tably: "7 sayfalık interaktif marka sitesi. .glb formatındaki 3B ürün modelini React Three Fiber ile yükleyip GSAP ScrollTrigger animasyonlarıyla senkronize ettim.",
        mfour: "TR/EN iki dilli, 10 sayfa ve 41 bileşenden oluşan ürün sitesi. Sözlük tabanlı i18n kurdum; Lighthouse'ta Performans 94, diğer üç kategoride 100.",
        gurkan: "8 sayfa ve 34 bileşenden oluşan marka sitesi. GSAP animasyonlarını Lenis smooth scroll ile birleştirdim; Lighthouse'ta Performans 92, diğer üç kategoride 100.",
        noteTaking: "Supabase Auth ve Realtime",
        invoice: "Context API, localStorage",
        kanban: "4 kişilik ekip",
      },
      categories: {
        brand: "Marka Sitesi",
        app: "Web Uygulaması",
        game: "Oyun",
        ecommerce: "E-ticaret",
        tool: "Araç",
        landing: "Açılış Sayfası",
      },
      experience: {
        label: "Deneyim",
        title: "Gerçek <i>müşteriler</i>, canlı projeler",
        role: "Freelance Web Developer",
        period: "Haziran 2026 — Günümüz",
        clients: "Tably.eu · Gürkan Optik · M-Four Chairs",
        stats: [
          { value: "3", label: "Müşteri" },
          { value: "25", label: "Sayfa yayında" },
          { value: "100", label: "Lighthouse SEO / Erişilebilirlik" },
        ],
        points: [
          "Markalar ve işletmeler için React, Next.js ve TypeScript ile modern, responsive ve SEO uyumlu kurumsal web siteleri tasarlayıp geliştirdim.",
          "Küçük işletmeler için üretim, stok, satış, cari hesap ve kasa süreçlerini yöneten ERP ve yönetim sistemleri geliştirdim.",
          "Çok firmalı (multi-tenant) SaaS mimarisi kurdum; Supabase (PostgreSQL) ve Row Level Security ile veri izolasyonu ve rol bazlı yetkilendirme sağladım.",
          "Müşterilerle ihtiyaç analizi yaparak gereksinimleri yazılım çözümlerine dönüştürdüm; projeleri tasarımdan canlıya (Vercel) taşıyıp bakımını üstlendim.",
        ],
      },
      about: {
        label: "Hakkımda",
        statement: "Gıda mühendisliğinden <i>arayüz zanaatına</i>.",
        body: "<hl>React</hl>, <hl>Next.js</hl> ve <hl>TypeScript</hl> ile kullanıcı odaklı, performanslı ve responsive web uygulamaları geliştiren bir Frontend Developer'ım. Gıda Mühendisliği eğitimimden gelen analitik düşünme ve süreç odaklı çalışma alışkanlığını yazılıma taşıyorum. Freelance olarak markalar için kimliklerini yansıtan web siteleri, küçük işletmeler için ise <hl>Supabase</hl> tabanlı yönetim sistemleri geliştiriyorum. Bursa'da yaşıyorum; uzaktan çalışmaya ve şehir değişikliğine açığım.",
        education: "Eğitim",
        capabilities: "Yetkinlikler",
        learning: "Şu an öğreniyorum",
      },
      education: [
        { school: "Nişantaşı Üniversitesi × Acunmedya Akademi", detail: "Frontend Development Sertifika Programı", years: "2024 — 2025" },
        { school: "Balıkesir Üniversitesi", detail: "Gıda Mühendisliği (Lisans)", years: "2018 — 2023", note: "TİM İnovaTİM inovasyon yarışması — ilk 10 (2021 — 2023)" },
      ],
      contact: {
        label: "İletişim",
        title: "Birlikte <i>olağanüstü</i> bir şey yaratalım.",
        body: "Tam zamanlı bir pozisyon, freelance bir proje ya da sadece işlerim hakkında konuşmak için bir e-posta yeterli.",
        cv: "CV'yi indir",
        cvShort: "CV",
      },
      footer: { rights: "Tüm hakları saklıdır.", top: "Başa dön", time: "Bursa" },
      theme: { dark: "Koyu tema", light: "Açık tema" },
    },
  },
  en: {
    translation: {
      nav: { work: "Work", experience: "Experience", about: "About", contact: "Contact" },
      lang: "Change language",
      hero: {
        eyebrow: "Portfolio — 2026",
        location: "Bursa, Türkiye · Remote",
        status: "Open to full-time roles & freelance",
        role: "Frontend Developer",
        lead: "I design and build refined, fast and meticulously crafted web experiences for brands.",
      },
      work: {
        label: "Selected Work",
        title: "Featured <i>work</i>",
        visit: "Visit site",
        client: "Client project",
        archive: "Archive",
        archiveTitle: "More <i>projects</i>",
        live: "Live",
        code: "Code",
        cols: { project: "Project", stack: "Stack", year: "Year" },
      },
      projects: {
        tably: "An interactive 7-page brand site. I loaded a .glb 3D product model with React Three Fiber and synced it with GSAP ScrollTrigger animations.",
        mfour: "A bilingual (TR/EN) product site with 10 pages and 41 components, built on dictionary-based i18n. Lighthouse Performance 94 and 100 in the other three categories.",
        gurkan: "An 8-page, 34-component brand site combining GSAP animation with Lenis smooth scroll. Lighthouse Performance 92 and 100 in the other three categories.",
        noteTaking: "Supabase Auth & Realtime",
        invoice: "Context API, localStorage",
        kanban: "Team of 4",
      },
      categories: {
        brand: "Brand Website",
        app: "Web App",
        game: "Game",
        ecommerce: "E-commerce",
        tool: "Tool",
        landing: "Landing Page",
      },
      experience: {
        label: "Experience",
        title: "Real <i>clients</i>, live projects",
        role: "Freelance Web Developer",
        period: "June 2026 — Present",
        clients: "Tably.eu · Gürkan Optik · M-Four Chairs",
        stats: [
          { value: "3", label: "Clients" },
          { value: "25", label: "Pages shipped" },
          { value: "100", label: "Lighthouse SEO / Accessibility" },
        ],
        points: [
          "Designed and built modern, responsive and SEO-friendly websites for brands and businesses with React, Next.js and TypeScript.",
          "Developed ERP and management systems that run production, stock, sales, accounts and cash flows for small businesses.",
          "Set up a multi-tenant SaaS architecture with data isolation and role-based access using Supabase (PostgreSQL) and Row Level Security.",
          "Ran requirement analysis with clients, turned needs into software, shipped projects from design to production on Vercel and maintained them.",
        ],
      },
      about: {
        label: "About",
        statement: "From food engineering to <i>interface craft</i>.",
        body: "I'm a Frontend Developer building user-focused, fast and responsive web applications with <hl>React</hl>, <hl>Next.js</hl> and <hl>TypeScript</hl>. I bring the analytical, process-driven mindset of my Food Engineering background into software. As a freelancer I build websites that reflect each brand's identity, and <hl>Supabase</hl>-based management systems for small businesses. I live in Bursa and I'm open to remote work and relocation.",
        education: "Education",
        capabilities: "Capabilities",
        learning: "Currently learning",
      },
      education: [
        { school: "Nişantaşı University × Acunmedya Academy", detail: "Frontend Development Certificate Program", years: "2024 — 2025" },
        { school: "Balıkesir University", detail: "B.Sc. Food Engineering", years: "2018 — 2023", note: "TİM İnovaTİM Innovation Competition — Top 10 (2021 — 2023)" },
      ],
      contact: {
        label: "Contact",
        title: "Let's create something <i>remarkable</i>.",
        body: "For a full-time role, a freelance project or simply a chat about my work, an email is all it takes.",
        cv: "Download CV",
        cvShort: "CV",
      },
      footer: { rights: "All rights reserved.", top: "Back to top", time: "Bursa" },
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
