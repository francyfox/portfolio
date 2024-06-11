import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const { getEntry } = useContentful()
  const { locale } = useI18n()
  const page = ref()
  const fetchPage = async () => {
    try {
      const data = await getEntry('57AL9ofAipA5DjSymqXzyY', {
        locale: locale.value === 'en' ? 'en-US' : 'ru',
      })
      page.value = data
    }
    catch {
      throw createError({
        statusCode: 500,
        message: 'Cant fetch content',
      })
    }
  }

  return {
    page,
    fetchPage,
  }
})
