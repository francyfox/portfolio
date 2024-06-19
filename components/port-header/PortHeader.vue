<script setup lang="ts">
import { NSkeleton, NButton, NDrawer, NDrawerContent } from 'naive-ui'
import PortLang from '~/components/port-lang/PortLang.vue'

defineProps<{
  data: {
    siteName: string
    headerNav: { name: string, to: string }[]
  } | undefined
  loading: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const showDrawer = ref(false)
</script>

<template>
  <header class="sticky bg-gradient-to-l from-[#43404766] from-10%  to-[#ffffff29] to-150% z-10 box-border">
    <div class="container">
      <div class="flex justify-between items-center gap-2 py-2 box-border">
        <nuxt-link
          :to="localePath('/')"
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
            class="hidden items-center gap-5 xl:(flex)"
          >
            <nuxt-link
              v-for="(item, index) in data?.headerNav"
              :key="index"
              :to="localePath(item.to)"
              class="link inline-flex text-xl px-2 py-3 hover:bg-amber hover:text-dark rounded-sm"
              active-class="bg-gray-900 pointer-events-none"
            >
              {{ item.name }}
            </nuxt-link>
          </nav>

          <n-button
            type="primary"
            class="burger h-[52px] xl:(hidden)"
            secondary
            @click="showDrawer = true"
          >
            <lucide-menu
              :width="32"
              :height="32"
            />
          </n-button>

          <div class="flex w-[120px] lt-xl:hidden ">
            <port-lang />
          </div>
        </div>
      </div>
      <n-drawer
        v-model:show="showDrawer"
        :width="320"
      >
        <n-drawer-content
          :title="t('menu')"
          closable
          resizable
        >
          <port-lang />
          <nav
            class="mt-5 flex flex-col gap-3"
          >
            <nuxt-link
              v-for="(item, index) in data?.headerNav"
              :key="index"
              :to="localePath(item.to)"
              class="link inline-flex text-xl px-2 py-3 hover:bg-amber hover:text-dark rounded-sm"
              active-class="bg-gray-900 pointer-events-none"
              @click="showDrawer = false"
            >
              {{ item.name }}
            </nuxt-link>
          </nav>
        </n-drawer-content>
      </n-drawer>
    </div>
  </header>
</template>

<style scoped>

</style>
