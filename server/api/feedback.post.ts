import { defineEventHandler, readValidatedBody } from 'h3'
import { turnstileValidate } from '~/server/module/turnstile/turnstile'
import feedbackSchema from '~/server/module/feedback/feedback.schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, feedbackSchema.parse)
  const token = process.env.TELEGRAM_API_TOKEN ?? ''
  const secret = process.env.TUNRNSTILE_SECRET_KEY ?? ''
  const apiURL = `https://api.telegram.org/bot${token}/sendMessage`
  const ip = getRequestHeader(event, 'CF-Connecting-IP')
    || getRequestIP(event)
    || getRequestHeader(event, 'Host')
    || ''
  const validateParameters = {
    secret,
    token: body.token,
    ip,
  }

  const validate = await turnstileValidate(validateParameters)

  if (validate.success) {
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
  }
  else {
    throw createError({
      status: 500,
      message: 'Turnstile validation failed',
    })
  }
})
