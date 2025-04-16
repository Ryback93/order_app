// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',           // tells Vite your index.html is inside the public folder
  base: './',               // ensures relative paths for proper Netlify/GitHub deploys
  build: {
    outDir: '../dist',      // output built files outside of /public
    emptyOutDir: true,
  },
  server: {
    open: true              // optional: auto opens browser on dev
  }
})