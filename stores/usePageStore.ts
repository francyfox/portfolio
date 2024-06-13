import { defineStore } from 'pinia'
import { SquidexError } from '@squidex/squidex'
import { useSquidex } from '~/composables/useSquidex'

export const usePageStore = defineStore('page', () => {
  const { client } = useSquidex()
  const { locale } = useI18n()
  const page = ref()
  const pageData = computed(() => {
    return {
      title: page.value?.data.title![locale.value],
      sections: page.value?.data.sections![locale.value],
    }
  })

  async function fetchPage(id: string) {
    try {
      const data = await client.contents.getContent('pages', id, {
        languages: locale.value,
      })

      page.value = data
    }
    catch (error) {
      if (error instanceof SquidexError && error.statusCode === 400) {
        throw createError({
          status: 500,
          message: 'Cant fetch page data',
        })
      }
    }
  }

  return {
    page,
    pageData,
    fetchPage,
  }
})
