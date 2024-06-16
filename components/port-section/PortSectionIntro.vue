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
  <section class="section-intro relative overflow-hidden h-full py-20">
    <div class="section-intro-bg absolute h-full z-1" />
    <div class="container relative">
      <div class="grid grid-cols-2 gap-5">
        <div class="w-full">
          <img
            src="https://res.cloudinary.com/dr5gcup5n/image/upload/f_auto,q_auto/v1/portfolio/yojrk7zsnthf2wosd8ac"
            alt="tree"
            class="absolute bottom-0 left-[5%]"
          >
        </div>
        <div class="w-full">
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

<style scoped lang="postcss">
.section-intro {
  @apply relative;

  &-bg {
    &:after {
      content: '';

      @apply top-[300px] left-[-100vw] absolute flex w-[200vw] h-[50vh] bg-dark rotate-20;
    }
  }
}
</style>
