<script setup lang="ts">
import { NButton } from 'naive-ui'

defineProps<{
  data: { to: string, title: string }[]
}>()
</script>

<template>
  <nav
    class="links flex flex-wrap gap-2"
  >
    <n-button
      v-for="(link, linkIndex) in data"
      :key="linkIndex"
      tag="a"
      :href="link.to"
      target="_blank"
      strong
      type="primary"
    >
      <span>
        {{ link.title }}
      </span>
    </n-button>
  </nav>
</template>

<style scoped>

</style>
