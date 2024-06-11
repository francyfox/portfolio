import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt(
  pluginVue.configs['flat/recommended'],
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    ignores: [".config/*"],
    rules: {
      'vue/multi-word-component-names': 'off',
      'unicorn/filename-case': 'off'
    }
  },
)
