<script setup lang="ts">
import { NCarousel, NSkeleton, NButton } from 'naive-ui'

withDefaults(
  defineProps<{
    data: {
      title: string
      slider: {
        title: string
        tags: string[]
        description: string
        image: string
        links: { title: string, to: string }[]
      }[]
    } | undefined
    loading: boolean
  }>(), {
    data: {
      title: '',
      slider: [{
        title: '',
        description: '',
        tags: Array.from({ length: 4 }, () => ''),
        image: '',
        links: [{ title: '', to: '' }],
      }],
    },
  },
)
</script>

<template>
  <section class="section-portfolio">
    <div class="container">
      <h1
        class="title text-4xl"
      >
        <span v-if="!loading">
          {{ data?.title }}
        </span>
        <span v-else>
          <n-skeleton
            text
            width="100"
          />
        </span>
      </h1>

      <n-carousel
        show-arrow
        autoplay
      >
        <div
          v-for="(slide, index) in data?.slider"
          :key="index"
          :style="`background-image: url('${slide.image}')`"
          class="flex flex-col gap-5 bg-dark:50 p-5"
        >
          <div
            v-if="!loading"
            class="title text-4xl"
          >
            .:: {{ slide.title }}
          </div>

          <div
            v-if="!loading"
            class="tags flex flex-wrap gap-5"
          >
            <n-button
              v-for="(tag, tagIndex) in slide.tags"
              :key="tagIndex"
              :disabled="true"
              type="tertiary"
            >
              {{ tag }}
            </n-button>
          </div>

          <div
            v-if="!loading"
            class="text"
          >
            {{ slide?.description }}
          </div>

          <nav
            v-if="!loading"
            class="links flex flex-wrap gap-5"
          >
            <n-button
              v-for="(link, linkIndex) in slide.links"
              :key="linkIndex"
              :tag="'a'"
            >
              <span>
                {{ link.title }}
              </span>
            </n-button>
          </nav>

          <!--          <n-skeleton -->
          <!--            v-if="loading" -->
          <!--            width="100%" -->
          <!--            height="500px" -->
          <!--          /> -->
        </div>
      </n-carousel>
    </div>
  </section>
</template>

<style scoped>

</style>
