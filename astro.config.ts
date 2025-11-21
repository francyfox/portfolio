import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import autoprefixer from "autoprefixer";

export default defineConfig({
  site: "https://portfolio.shalotts.site",
  vite: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  integrations: [
    UnoCSS({
      injectReset: true
    }),
  ],
})