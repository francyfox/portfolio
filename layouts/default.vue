<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui'
import { themeOverrides } from '~/app/module/theme/theme'
import PortHeader from '~/components/port-header/PortHeader.vue'
import PortFooter from '~/components/port-footer/PortFooter.vue'
import { particlesFlareOptions } from '~/app/module/particles/particles.flare'

const { t } = useI18n()
const route = useRoute()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
const title = computed(() => t(route.meta.title as string ?? 'TBD') + '| Portfolio')
const store = useCommonStore()
const { commonData } = storeToRefs(store)

const { status } = useAsyncData(() => store.fetchCommon())
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
          <audio
            ref="audioRef"
            autoplay
            class="hidden"
          />
          <nuxt-particles
            id="tsparticles"
            :options="particlesFlareOptions"
            class="opacity-15"
          />
          <div class="bg flex w-full justify-center items-center absolute top-0 left-0 overflow-hidden z-[-1]">
            <img
              src="/img/vintage_pattern_1.svg"
              alt="bg"
              class="w-full h-screen opacity-5 p-5"
            >
          </div>

          <n-modal-provider>
            <NuxtLoadingIndicator />
            <div class="flex flex-col justify-between h-full">
              <port-header
                :data="commonData"
                :loading="status !== 'success'"
              />
              <slot />
              <port-footer
                :data="commonData"
                :loading="status !== 'success'"
              />
            </div>
          </n-modal-provider>
        </Body>
      </n-message-provider>
    </n-config-provider>
  </Html>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
