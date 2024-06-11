<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const { t } = useI18n()
const route = useRoute()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
const themeOverrides: GlobalThemeOverrides = {}
const title = computed(() => t(route.meta.title as string ?? 'TBD') + '| Portfolio')
</script>

<template>
  <Html
    :lang="head.htmlAttrs.lang"
    :dir="head.htmlAttrs.dir"
  >
    <Head>
      <Title>{{ title }}</Title>
      <template
        v-for="link in head.link"
        :key="link.id"
      >
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template
        v-for="meta in head.meta"
        :key="meta.id"
      >
        <Meta
          :id="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <n-config-provider
      preflight-style-disabled
      :theme-overrides="themeOverrides"
    >
      <n-message-provider>
        <Body>
          <n-modal-provider>
            <NuxtLoadingIndicator />
            <slot />
          </n-modal-provider>
        </Body>
      </n-message-provider>
    </n-config-provider>
  </Html>
</template>

<style scoped>

</style>
