import { defineEventHandler, readValidatedBody } from 'h3'
import { z } from 'zod'

const stringError = (key: string) => {
  return {
    required_error: `${key} is required`,
    invalid_type_error: `${key} must be a string`,
  }
}

const feedbackSchema = z.object({
  company: z.string(stringError('company')).optional(),
  fullName: z.string(stringError('full name')),
  hasSocial: z.boolean({
    required_error: `hasSocial is required`,
    invalid_type_error: `hasSocial must be a boolean`,
  }).optional(),
  phone: z
    .string(stringError('phone')),
  message: z.string(stringError('message')),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, feedbackSchema.parse)
  const token = process.env.TELEGRAM_API_TOKEN ?? ''
  const apiURL = `https://api.telegram.org/bot${token}/sendMessage`

  try {
    const data = await $fetch(apiURL, {
      method: 'POST',
      body: {
        chat_id: 868_076_136,
        text: `Сообщение с сайта портфолио \n${JSON.stringify(body, undefined, 2)}`,
      },
    })

    return { message: 'success', body: data }
  }
  catch {
    throw createError({
      status: 500,
      message: 'Cant send message to Telegram bot',
    })
  }
})
