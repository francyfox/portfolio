<script setup lang="ts">
import { defineAsyncComponent } from '@vue/runtime-core'
import { NConfigProvider, NMessageProvider, NModalProvider, NDialogProvider } from 'naive-ui'
import { themeOverrides } from '../theme.ts'

const FeedbackForm = defineAsyncComponent(() => import('./FeedbackForm.vue'))

const {
  turnstileSiteKey,
} = defineProps<{
  turnstileSiteKey?: string
}>()

</script>

<template>
  <NConfigProvider
      preflight-style-disabled
      :theme-overrides="themeOverrides"
  >
    <NMessageProvider>
      <NDialogProvider>
        <NModalProvider>
          <FeedbackForm
              :turnstile-site-key="turnstileSiteKey"
          />
        </NModalProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>

</style>