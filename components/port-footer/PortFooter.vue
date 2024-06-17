<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

defineProps<{
  data: {
    copyrigth: string
    counters: string
  } | undefined
  loading: boolean
}>()
</script>

<template>
  <footer class="section-footer mt-20 bg-gradient-to-r from-[#43404766] from-10%  to-[#ffffff29] to-150% z-10">
    <div class="container">
      <div class="flex justify-between items-center py-5">
        <div class="copyright flex">
          <div
            v-if="loading"
            class="inline-flex w-[250px]"
          >
            <n-skeleton
              text
              width="100"
            />
          </div>
          <div
            v-else
            v-html="data?.copyrigth"
          />
        </div>

        <div
          class="counters hidden"
          v-html="data?.counters"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
