<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui'
import { useCommonStore } from '~/store/useCommonStore'
import { themeOverrides } from '~/app/module/theme/theme'

const { t, locale } = useI18n()
const route = useRoute()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
const title = computed(() => t(route.meta.title as string ?? 'TBD') + '| Portfolio')
const store = useCommonStore()
await store.fetchCommon()
const { commonData } = storeToRefs(store)

watch(locale, async () => {
  await store.fetchCommon()
})
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
        <Body class="relative">
          <div class="bg flex w-full justify-center items-center absolute top-0 left-0 overflow-hidden z-[-1]">
            <img
              src="/img/vintage_pattern_1.svg"
              alt="bg"
              class="w-full h-screen opacity-5 p-5"
            >
          </div>

          <n-modal-provider>
            <NuxtLoadingIndicator />
            <port-header :data="commonData" />
            <slot />
          </n-modal-provider>
        </Body>
      </n-message-provider>
    </n-config-provider>
  </Html>
</template>

<style scoped>

</style>
