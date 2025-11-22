import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import autoprefixer from "autoprefixer";
import rehypeExternalLinks from 'rehype-external-links';
import { visit } from 'unist-util-visit';
import vercel from '@astrojs/vercel/serverless';
import vue from '@astrojs/vue';


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
        autoprefixer()
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
})