<script setup lang="ts">
import { usePageStore } from '~/store/usePageStore'

const store = usePageStore()
await store.fetchPage()
</script>

<template>
  <h1 class="c-amber">
    test
  </h1>
</template>

<style scoped>

</style>
