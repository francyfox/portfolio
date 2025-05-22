import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  modules: [
    ['nuxt-yandex-metrika', {
      id: 102_063_506,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      verification: 'b384d10badb4f1fd',
    }],
    'nuxtjs-naive-ui',
    ['@nuxt/content', {}],
    ['@vite-pwa/nuxt', {
      meta: {
        theme_color: 'rgba(64,30,110,0.15)',
      },
    }],
    ['nuxt-delay-hydration', {
      mode: 'init',
      debug: process.env.NODE_ENV === 'development',
    }],
    ['@nuxtjs/seo', {}],
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
  components: false,
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    '@unocss/reset/tailwind-compat.css',
    '@fontsource/tenor-sans',
    '@fontsource/montserrat-alternates',
    '~/assets/postcss/base.pcss',
  ],
  runtimeConfig: {
    public: {
      environment: process.env.VUE_APP_SQUIDEX_URL ?? '',
      appName: process.env.VUE_APP_SQUIDEX_APPNAME ?? '',
      clientId: process.env.VUE_APP_SQUIDEX_CLIENTID ?? '',
      clientSecret: process.env.VUE_APP_SQUIDEX_CLIENTSECRET ?? '',
      turnstileSiteKey: process.env.TUNRNSTILE_SITE_KEY ?? '',
    },
  },
  alias: {
    '#/': './',
    '#components/': './components/',
    '#assets/': './assets/',
    '#pages/': './pages/',
  },
  build: {
    transpile: ['vueuc', 'naive-ui'],
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  compatibilityDate: '2025-05-22',
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc']
          : [],
    },
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'nButton',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    css: {
      devSourcemap: process.env.NODE_ENV === 'development',
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-hexrgba': {},
      '@unocss/postcss': {},
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Russian', file: 'ru.json' },
    ],
  },
})
