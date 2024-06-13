export default defineNuxtConfig({
  components: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      environment: process.env.VUE_APP_SQUIDEX_URL ?? '',
      appName: process.env.VUE_APP_SQUIDEX_APPNAME ?? '',
      clientId: process.env.VUE_APP_SQUIDEX_CLIENTID ?? '',
      clientSecret: process.env.VUE_APP_SQUIDEX_CLIENTSECRET ?? '',
    },
  },
  modules: [
    ['nuxt-delay-hydration', {
      mode: 'mount',
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
    }], '@unocss/nuxt', 'nuxt-lucide-icons', ['@nuxtjs/i18n', {
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
    }], '@pinia/nuxt'],
  devServer: {
    port: 9000,
  },
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
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            '@css-render/vue3-ssr',
            'vueuc',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  alias: {
    '#/': './',
    '#components/': './components/',
    '#assets/': './assets/',
    '#pages/': './pages/',
  },
})
