<script setup lang="ts">
import { useCommonStore } from '~/store/useCommonStore'

const store = useCommonStore()
const { commonData } = storeToRefs(store)

if (commonData.value?.seo) {
  useSeoMeta(commonData.value?.seo)
}
</script>

<template>
  <section class="section-intro py-20">
    <div class="container">
      <div class="flex gap-5">
        <div class="w-full md:w-1/2" />
        <div class="w-full md:w-1/2">
          <main
            class="text-md"
            v-html="'ss'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
