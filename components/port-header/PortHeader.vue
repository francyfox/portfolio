<script setup lang="ts">
import PortLang from '~/components/port-lang/PortLang.vue'

defineProps<{
  data: {
    siteName: string
    headerNav: { name: string, to: string }[]
  }
}>()
</script>

<template>
  <header class="sticky bg-[#43404725]">
    <div class="container">
      <div class="flex justify-between items-center gap-2 py-2">
        <nuxt-link
          to="/"
          class="site-name text-2xl"
        >
          <span
            v-if="!data?.siteName"
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
            {{ data.siteName }}
          </span>
        </nuxt-link>

        <div class="flex items-center gap-8">
          <nav
            v-if="!data?.headerNav"
            class="flex gap-2"
          >
            <n-skeleton
              v-for="(item, index) in Array.from({ length: 5 }, () => null)"
              :key="index"
              text
              round
              class="w-[80px]"
            />
          </nav>
          <nav v-else>
            <nuxt-link
              v-for="(item, index) in data.headerNav"
              :key="index"
              :to="item.to"
              class="link text-xl"
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
