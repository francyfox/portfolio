<script setup lang="ts">
const { locale, setLocale } = useI18n()
const value = ref(locale.value)
const options = [
  {
    label: 'Русский',
    value: 'ru',
  },
  {
    label: 'English',
    value: 'en',
  },
]

const onChangeLocale = () => {
  setLocale(value.value)
}
</script>

<template>
  <client-only>
    <div class="flex gap-2 bg-[#ffffff12] p-2 rd-sm">
      <lucide-book-a :size="32" />
      <n-select
        v-model:value="value"
        :options="options"
        @update:value="onChangeLocale"
      />
    </div>
  </client-only>
</template>

<style scoped>

</style>
