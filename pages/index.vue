<script setup lang="ts">
import PortSectionIntro from '~/components/port-section/PortSectionIntro.vue'

const { locale } = useI18n()
const store = useCommonStore()
const pageStore = usePageStore()
const { commonData } = storeToRefs(store)
const { pageData } = storeToRefs(pageStore)

if (commonData.value?.seo) {
  useSeoMeta(commonData.value?.seo)
}
const { status } = useAsyncData(() => pageStore.fetchPage('d282977a-f03f-47fc-8b2a-a01d2fd98f40'))

// watch(locale, async () => {
//   await pageStore.fetchPage('d282977a-f03f-47fc-8b2a-a01d2fd98f40')
// })
</script>

<template>
  <port-section-intro
    :data="pageData.sections[0]"
    :loading="status !== 'success'"
  />
</template>

<style scoped>

</style>
