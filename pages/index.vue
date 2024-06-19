<script setup lang="ts">
import { loadFireflyPreset } from '@tsparticles/preset-firefly'
import { tsParticles } from '@tsparticles/engine'
import { useMessage } from 'naive-ui'
import PortSectionIntro from '~/components/port-section/PortSectionIntro.vue'
import PortModalFeedback from '~/components/port-modal/PortModalFeedback.vue'

const { locale } = useI18n()
const message = useMessage()
const store = useCommonStore()
const pageStore = usePageStore()
const { commonData } = storeToRefs(store)
const { pageData } = storeToRefs(pageStore)
const hasKadet = ref(false)
const showModalFeedback = ref(false)

if (commonData.value?.seo) {
  useSeoMeta(commonData.value?.seo)
}
const { status } = useAsyncData(() => pageStore.fetchPage('d282977a-f03f-47fc-8b2a-a01d2fd98f40'))

watch(locale, () => pageStore.fetchPage('d282977a-f03f-47fc-8b2a-a01d2fd98f40'))

if (import.meta.client) {
  await loadFireflyPreset(tsParticles)
}

onMounted(() => {
  if (!localStorage.getItem('port-error')) {
    hasKadet.value = true
  }

  showModalFeedback.value = window.location.hash === '#feedback'

  window.addEventListener('hashchange', () =>
    showModalFeedback.value = window.location.hash === '#feedback',
  )
})
</script>

<template>
  <div class="page home-page relative">
    <port-section-intro
      v-if="pageData.sections"
      :data="pageData.sections[0]"
      :loading="status !== 'success'"
    />
    <port-modal-feedback v-model="showModalFeedback" />
    <nuxt-link
      v-if="hasKadet"
      to="/error"
      class="flex absolute bottom-[-5rem] left-[5%] z-20 bg-transparent"
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
