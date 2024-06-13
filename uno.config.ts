import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  presets: [
    presetUno(),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
      maxWidth: {
        lg: '1420px',
      },
    },
  },
})
