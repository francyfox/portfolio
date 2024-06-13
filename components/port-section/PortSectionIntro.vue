<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

defineProps<{
  data: {
    title: string
    body: string
  } | undefined
  loading: boolean
}>()
</script>

<template>
  <section class="section-intro py-20">
    <div class="container">
      <div class="flex gap-5">
        <div class="w-full md:w-1/2" />
        <div class="w-full md:w-1/2">
          <h1 class="title text-4xl">
            <span v-if="loading">
              <n-skeleton text />
            </span>
            <span v-else>
              {{ data?.title }}
            </span>
          </h1>

          <main
            v-if="loading"
            class="text-md"
          >
            <n-skeleton
              text
              :repeat="4"
            />
          </main>

          <main
            v-else
            class="text-md"
            v-html="$mdRenderer.render(data?.body)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
