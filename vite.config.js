import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /reel (sonunda / olmadan) yerel sunucuda da reel/index.html'i açsın; canlıda bunu vercel.json yapıyor
const reelRoute = () => {
  const rewrite = (req, _res, next) => {
    if (req.url === '/reel' || req.url.startsWith('/reel?')) req.url = req.url.replace('/reel', '/reel/')
    next()
  }
  return {
    name: 'reel-route',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

// https://vite.dev/config/
// İki sayfa: ana portfolyo (/) ve showreel (/reel)
export default defineConfig({
  plugins: [react(), reelRoute()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        reel: fileURLToPath(new URL('./reel/index.html', import.meta.url)),
      },
    },
  },
})
