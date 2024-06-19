<script setup lang="ts">
const error = useError()
const show = ref(true)

const localePath = useLocalePath()
const isProduction = !import.meta.dev
onMounted(() => {
  setTimeout(() => show.value = false, 5000)

  if (error.value?.data?.path === '/error') {
    window.localStorage.setItem('port-error', '1')
  }
})
</script>

<template>
  <NuxtLayout :name="'error'">
    <div
      v-if="show"
      class="funny"
    >
      <h1 class="title text-8xl lt-xl:text-2xl text-align-center">
        Directed by
      </h1>
      <h2 class="text-8xl lt-xl:text-2xl uppercase text-align-center">
        robert b. weide
      </h2>

      <audio
        v-if="isProduction"
        src="https://www.myinstants.com/media/sounds/directed-by-robert-b_voI2Z4T.mp3"
        autoplay
      />
    </div>
    <div
      v-else
      class="prose text-4xl lt-xl:text-md text-align-center"
    >
      <p>
        <strong>{{ error.message }}</strong>
      </p>
      <p>It looks like something broke.</p>
      <p>Sorry about that.</p>
      <nuxt-link
        :to="localePath('/')"
        class="link text-amber hover:text-red transition-colors"
      >
        Move to Home Page
      </nuxt-link>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.funny, .prose {
  font-family: 'Times New Roman',serif;
}
</style>
