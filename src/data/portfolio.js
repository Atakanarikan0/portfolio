// featured: büyük görselle öne çıkan işler
// key: i18n'deki projects.<key> açıklaması (öne çıkanlarda paragraf, arşivde kısa not)
// focus: dar kartlarda görselin hangi tarafı görünsün (CSS object-position), varsayılan 'top center'
// repo: isteğe bağlı; gizli repolarda boş bırak, "Kod" linki gösterilmez
export const projects = [
  { key: 'tably', title: 'Tably.eu', image: '/img/tably-eu.webp', demo: 'https://tably-eu.vercel.app', category: 'brand', stack: 'Next.js · TypeScript · React Three Fiber · GSAP', year: 2026, featured: true },
  { key: 'mfour', title: 'M-Four Chairs', image: '/img/m-four.webp', demo: 'https://m-four-opus.vercel.app', category: 'brand', stack: 'Next.js · TypeScript · i18n', year: 2026, featured: true },
  { key: 'gurkan', title: 'Gürkan Optik', image: '/img/gurkan-optik.webp', demo: 'https://gurkan-optik.vercel.app', category: 'brand', stack: 'Next.js · TypeScript · GSAP · Lenis', year: 2026, featured: true },
  { key: 'zein', title: 'Zein Möbel', image: '/img/zein-mobel.webp', demo: 'https://zeinmobel.com', focus: 'left center', category: 'showcase', stack: 'React · TypeScript · Vite · i18n', year: 2026, featured: true },
  { key: 'krampon', title: 'Krampon Center', image: '/img/krampon-center.webp', demo: 'https://krampon-center.vercel.app', category: 'showcase', stack: 'Next.js · TypeScript · Tailwind CSS · GSAP · Lenis', year: 2026, featured: true },
  { key: 'noteTaking', title: 'Note Taking', image: '/img/note-taking.webp', demo: 'https://note-taking-web-app-ccnm.vercel.app/auth/login', repo: 'https://github.com/Atakanarikan0/note-taking-web-app', category: 'app', stack: 'Next.js · Supabase', year: 2025 },
  { key: 'invoice', title: 'Invoice App', image: '/img/invoice-app.webp', demo: 'https://invoice-app-3y4g.vercel.app/', repo: 'https://github.com/Atakanarikan0/invoice-app', category: 'app', stack: 'React', year: 2025 },
  { title: 'Hangman', image: '/img/hangman.webp', demo: 'https://3adam-hangman-last.vercel.app/', repo: 'https://github.com/Atakanarikan0/3adam', category: 'game', stack: 'React', year: 2025 },
  { key: 'kanban', title: 'Kanban', image: '/img/kanban-web-app.webp', demo: 'https://atakan-berna-ece-g-kdeniz-kanban-task.vercel.app/', repo: 'https://github.com/Atakanarikan0/200found-kanban-task', category: 'app', stack: 'React', year: 2025 },
  { title: 'Audiophile', image: '/img/audiophile.webp', demo: 'https://kamp-zodyak-flame.vercel.app/', repo: 'https://github.com/Atakanarikan0/kamp-zodyak', category: 'ecommerce', stack: 'JavaScript', year: 2025 },
];

export const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'GSAP', 'Three.js', 'Figma', 'Git'];

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atakan-arikan-677b8a247/' },
  { label: 'GitHub', href: 'https://github.com/Atakanarikan0' },
  { label: 'Instagram', href: 'https://www.instagram.com/atakan.arikann' },
];

export const email = 'atakanarkn1@outlook.com';
