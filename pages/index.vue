<script setup lang="ts">
import { loadFireflyPreset } from '@tsparticles/preset-firefly'
import { tsParticles } from '@tsparticles/engine'
import { useMessage } from 'naive-ui'
import PortSectionIntro from '~/components/port-section/PortSectionIntro.vue'
import { particlesFlareOptions } from '~/app/module/particles/particles.flare'

const message = useMessage()
const store = useCommonStore()
const pageStore = usePageStore()
const { commonData } = storeToRefs(store)
const { pageData } = storeToRefs(pageStore)

if (commonData.value?.seo) {
  useSeoMeta(commonData.value?.seo)
}
const { status } = useAsyncData(() => pageStore.fetchPage('d282977a-f03f-47fc-8b2a-a01d2fd98f40'))

if (import.meta.client) {
  await loadFireflyPreset(tsParticles)
}

onMounted(() => {
  if (!localStorage.getItem('port-audio')) {
    setTimeout(() => {
      message.warning('Allow audio autoplay for this site', { closable: true, duration: 9999 })
      localStorage.setItem('port-audio', '1')
    }, 2000)
  }
})
</script>

<template>
  <div class="page home-page relative">
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
    <port-section-intro
      :data="pageData.sections[0]"
      :loading="status !== 'success'"
    />
    <nuxt-link
      to="/error"
      class="flex absolute bottom-0 left-[5%] z-20 bg-transparent"
      title="I see you..."
    >
      <img
        src="/img/kedet-war-room.gif"
        alt="kedet-war-room"
        width="120"
        height="120"
      >
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>
