<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import { parseMarkdown } from '~/app/utils'

const properties = defineProps<{
  data: {
    title: string
    body: string
  } | undefined
  loading: boolean
}>()

const content = ref(undefined)

const renderContent = async () => {
  content.value = await parseMarkdown(properties.data?.body ?? 'No content found')
}

await renderContent()

onMounted(async () => {
  await renderContent()
  document.querySelector('a[href="/#feedback"]')?.addEventListener('click', () => {
    window.location.hash = ''
    window.location.hash = '#feedback'
  })
})
</script>

<template>
  <section class="section-intro relative h-full py-20 lt-xl:(py-10)">
    <div class="section-intro-bg absolute h-full z-1" />
    <div class="container relative">
      <div class="grid grid-cols-2 lt-xl:(grid-cols-1) gap-5">
        <div class="w-full relative">
          <img
            src="https://res.cloudinary.com/dr5gcup5n/image/upload/f_auto,q_auto/v1/portfolio/yojrk7zsnthf2wosd8ac"
            alt="tree"
            class="absolute bottom-[-20px] left-0 lt-xl:(fixed opacity-40 bottom-[40px])"
          >
        </div>
        <div class="w-full z-1">
          <h1 class="title text-4xl lt-xl:text-2xl">
            <span v-if="!data?.title">
              <n-skeleton
                text
              />
            </span>
            <span v-else>
              {{ data?.title }}
            </span>
          </h1>

          <main
            v-if="!content"
            class="text-md lt-xl:text-sm"
          >
            <n-skeleton
              text
              :repeat="14"
            />
          </main>

          <ContentRendererMarkdown
            v-if="content"
            :value="content"
            tag="main"
            class="content"
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

      @apply fixed bottom-[-80px] left-[-100vw]  flex w-[200vw] h-[50vh] bg-dark rotate-10;

      @screen lt-xl {
        @apply !bottom-[-150px];
      }
    }
  }
}
</style>
