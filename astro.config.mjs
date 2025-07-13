// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import astroIcon from "astro-icon"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  output: 'static',
  outDir: './dist',
  base: '/',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  integrations: [
    react({ experimentalReactChildren: true }),
    astroIcon()
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      }
    }
  }
})
