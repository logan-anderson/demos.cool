import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  appType: 'mpa',
  plugins: [
    {
      name: 'rewrite-middleware',
      configureServer(serve) {
        serve.middlewares.use((req, res, next) => {
          if (req?.url?.startsWith('/demos/')) {
            req.url = req.url.endsWith('/') ? req.url : req.url + '/'
          }
          next()
        })
      }
    },
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'local-llm': resolve(__dirname, 'demos/local-llm/index.html'),
      },
    },
  },
})
