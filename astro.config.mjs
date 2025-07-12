// @ts-check
import { defineConfig } from 'astro/config';
// @ts-ignore
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import astroIcon from 'astro-icon';

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
    tailwind({ applyBaseStyles: false }),
    astroIcon()
  ],
  vite: {
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
});