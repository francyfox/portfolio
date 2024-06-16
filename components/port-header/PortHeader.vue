<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import PortLang from '~/components/port-lang/PortLang.vue'

defineProps<{
  data: {
    siteName: string
    headerNav: { name: string, to: string }[]
  } | undefined
  loading: boolean
}>()
</script>

<template>
  <header class="sticky bg-gradient-to-l from-[#43404766] from-10%  to-[#ffffff29] to-150% z-10">
    <div class="container">
      <div class="flex justify-between items-center gap-2 py-2">
        <nuxt-link
          to="/"
          class="site-name text-2xl"
        >
          <span
            v-if="loading"
            class="flex w-[150px]"
          >
            <transition>
              <n-skeleton
                text
                round
                width="10"
              />
            </transition>
          </span>
          <span v-else>
            {{ data?.siteName }}
          </span>
        </nuxt-link>

        <div class="flex items-center gap-5">
          <nav
            v-if="loading"
            class="flex gap-5"
          >
            <n-skeleton
              v-for="(item, index) in Array.from({ length: 5 }, () => null)"
              :key="index"
              text
              round
              class="w-[80px]"
            />
          </nav>
          <nav
            v-else
            class="flex items-center gap-5"
          >
            <nuxt-link
              v-for="(item, index) in data?.headerNav"
              :key="index"
              :to="item.to"
              class="link inline-flex text-xl px-2 py-3 hover:bg-amber hover:text-dark rounded-sm"
              active-class="bg-gray-900 pointer-events-none"
            >
              {{ item.name }}
            </nuxt-link>
          </nav>

          <div class="flex w-[120px] shrink-0">
            <port-lang />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
