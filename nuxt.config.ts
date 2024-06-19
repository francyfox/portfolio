export default defineNuxtConfig({
  components: false,
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  runtimeConfig: {
    public: {
      environment: process.env.VUE_APP_SQUIDEX_URL ?? '',
      appName: process.env.VUE_APP_SQUIDEX_APPNAME ?? '',
      clientId: process.env.VUE_APP_SQUIDEX_CLIENTID ?? '',
      clientSecret: process.env.VUE_APP_SQUIDEX_CLIENTSECRET ?? '',
      turnstileSiteKey: process.env.TUNRNSTILE_SITE_KEY ?? '',
    },
  },
  modules: [
    ['@vite-pwa/nuxt', {
      meta: {
        theme_color: 'rgba(64,30,110,0.15)',
      },
    }],
    ['nuxt-delay-hydration', {
      mode: 'init',
      debug: process.env.NODE_ENV === 'development',
    }],
    ['@nuxtjs/seo', {
      robots: false,
    }],
    ['@nuxt/eslint', {
      config: {
        stylistic: true,
        semi: true,
      },
    }],
    '@unocss/nuxt', 'nuxt-lucide-icons',
    ['@nuxtjs/i18n', {
      strategy: 'prefix_and_default',
      defaultLocale: 'ru',
      locales: [
        {
          id: 0,
          code: 'ru',
          name: 'Русский',
          iso: 'ru-RU',
        },
        {
          id: 1,
          code: 'en',
          name: 'English',
          iso: 'en-US',
        },
      ],
    }],
    '@pinia/nuxt', ['nuxt-particles', {
      mode: 'custom',
      lazy: true,
    }]],
  css: [
    '@unocss/reset/tailwind-compat.css',
    '@fontsource/tenor-sans',
    '@fontsource/montserrat-alternates',
    '~/assets/postcss/base.pcss',
  ],
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-hexrgba': {},
      '@unocss/postcss': {},
    },
  },
  vite: {
    css: {
      devSourcemap: process.env.NODE_ENV === 'development',
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui'] // ,
          : [],
    },
    plugins: [],
  },
  alias: {
    '#/': './',
    '#components/': './components/',
    '#assets/': './assets/',
    '#pages/': './pages/',
  },
})
