<script setup lang="ts">
import { NCarousel, NCarouselItem, NButton } from 'naive-ui'
import PortSliderLinks from '~/components/port-slider-links/PortSliderLinks.vue'
import PortModalFeedback from '~/components/port-modal/PortModalFeedback.vue'

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
        tags: Array.from({length: 4}, () => ''),
        image: '',
        links: [{title: '', to: ''}],
      }],
    },
  },
)

const showModalFeedback = ref(false)
</script>

<template>
  <section class="section-portfolio my-5">
    <div class="container">
      <div class="head-links mb-2 font-bold">
        <p>
          # <a href="https://drive.google.com/file/d/1OcxsZEK4sBV8ubiOrnphzFNgKH0eTiVh/view?usp=sharing">PDF</a>
          | # <a href="https://hh.ru/resume/14785116ff0ee09b660039ed1f6c483545436c">HeadHunter</a>
          | # <a href="https://github.com/francyfox">Github</a>
          | # <a href="https://t.me/francyfox">Telegram</a>
          | # <a href="#feedback"
                 @click.prevent="showModalFeedback = true"
        >
          Feedback form
        </a>
        </p>
        <p>
          Time zone UTC+5 (Qazaqstan, Ust-Kamenogorsk)
        </p>
      </div>
      <h1
        class="title text-4xl"
      >
        <span>
          {{ data?.title }}
        </span>
      </h1>

      <n-carousel
        show-arrow
        autoplay
        class="relative"
      >
        <n-carousel-item
          v-for="(slide, index) in data?.slider"
          :key="index"
        >
          <div
            :style="`background-image: url('${slide.image}')`"
            class="flex flex-col justify-end items-end gap-5 min-h-[650px] bg-dark:50 backdrop-blur-lg rounded-sm overflow-hidden bg-cover p-5"
          >
            <div
              class="max-w-2xl flex flex-col gap-5 bg-dark:95 p-5 rounded-sm"
            >
              <div
                class="title text-3xl lt-md:(text-xl)"
              >
                .:: {{ slide.title }}
              </div>

              <div
                class="tags flex flex-wrap gap-2"
              >
                <n-button
                  v-for="(tag, tagIndex) in slide.tags"
                  :key="tagIndex"
                  strong
                  secondary
                  type="info"
                >
                  {{ tag }}
                </n-button>
              </div>

              <div
                class="text text-sm"
              >
                {{ slide?.description }}
              </div>

              <port-slider-links
                :data="slide.links"
              />
            </div>
          </div>
        </n-carousel-item>

        <template #arrow="{ prev, next }">
          <div class="custom-arrow absolute right-[20px] bottom-[30px]">
            <button
              type="button"
              class="custom-arrow--left"
              @click="prev"
            >
              <lucide-square-chevron-left/>
            </button>
            <button
              type="button"
              class="custom-arrow--right"
              @click="next"
            >
              <lucide-square-chevron-right/>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots absolute left-5 bottom-5">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </div>
    <port-modal-feedback v-model="showModalFeedback" />
  </section>
</template>

<style scoped lang="postcss">
.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 0 2px #000;
}

.custom-dots li.is-active {
  width: 40px;

  @apply bg-amber;
}
</style>
