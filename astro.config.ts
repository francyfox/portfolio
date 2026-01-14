import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import autoprefixer from "autoprefixer";
import rehypeExternalLinks from 'rehype-external-links';
import { visit } from 'unist-util-visit';
import vercel from '@astrojs/vercel';
import vue from '@astrojs/vue';
import compressor from "astro-compressor";
import partytown from '@astrojs/partytown';

function addLazyLoading() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        if (!node.properties.loading) {
          node.properties.loading = 'eager';
        }
      }
    });
  };
}

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: "https://portfolio.shalotts.site",
  vite: {
    postcss: {
      plugins: [
        autoprefixer(),
      ]
    },
    ssr: {
      noExternal: ["naive-ui", "vueuc", "date-fns"],
    },
  },
  integrations: [
    vue({ appEntrypoint: '/src/pages/_app' }),
    UnoCSS({
      injectReset: true
    }),
    compressor({ gzip: { level: 6 }, brotli: { chunkSize: 16 * 512 } }),
    (await import("@playform/inline")).default(),
    partytown()
  ],
  markdown: {
    rehypePlugins: [
      addLazyLoading,
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        test: (node) =>
          node.properties.href &&
          !node.properties.href.startsWith('/') &&
          !node.properties.href.startsWith('#'),
      }],
    ],
  },
  redirects: {
    '/en': '/',
  },
})