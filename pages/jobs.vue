<script setup lang="ts">
import PortSectionPortfolio from '~/components/port-section/PortSectionPortfolio.vue'

const { locale } = useI18n()
const store = usePageStore()
const { pageData } = storeToRefs(store)

const { status } = useAsyncData(() => store.fetchPage('9940073b-e68b-4e88-a417-85cbea4ac034'))

watch(locale, () => store.fetchPage('9940073b-e68b-4e88-a417-85cbea4ac034'))
</script>

<template>
  <port-section-portfolio
    v-if="pageData?.sections"
    :data="{ title: pageData.title, slider: pageData?.sections[0].data }"
    :loading="status !== 'success'"
  />
</template>

<style scoped>

</style>
