<script setup lang="ts">
defineProps<{
  data: {
    siteName: string
    headerNav: { name: string, to: string }[]
  }
}>()
</script>

<template>
  <header class="sticky">
    <div class="container">
      <div class="flex justify-between gap-2">
        <nuxt-link
          to="/"
          class="site-name"
        >
          {{ data.siteName }}
        </nuxt-link>

        <nav>
          <nuxt-link
            v-for="(item, index) in data.headerNav"
            :key="index"
            :to="item.to"
            class="link"
          >
            {{ item.name }}
          </nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
