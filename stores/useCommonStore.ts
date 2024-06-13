import { defineStore } from 'pinia'
import { SquidexError } from '@squidex/squidex'
import { useSquidex } from '~/composables/useSquidex'

export const useCommonStore = defineStore('common', () => {
  const { client } = useSquidex()
  const { locale } = useI18n()
  const common = ref()
  const commonData = computed(() => {
    return common.value
      ? {
          siteName: common.value?.data.siteName![locale.value],
          headerNav: common.value?.data.headerNav![locale.value],
          seo: common.value?.data.seo![locale.value],
        }
      : undefined
  })
  const fetchCommon = async () => {
    try {
      const data = await client.contents.getContents('common', {
        languages: locale.value,
      })

      common.value = data.items[0]
    }
    catch (error) {
      if (error instanceof SquidexError && error.statusCode === 400) {
        throw createError({
          status: 500,
          message: 'Cant fetch navigation bar',
        })
      }
    }
  }

  return {
    common,
    fetchCommon,
    commonData,
  }
})
