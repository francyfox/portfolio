import { defineEventHandler, readValidatedBody } from 'h3'
import { z } from 'zod'

const stringError = (key: string) => {
  return {
    required_error: `${key} is required`,
    invalid_type_error: `${key} must be a string`,
  }
}

const feedbackSchema = z.object({
  'company': z.string(stringError('company')).optional(),
  'fullName': z.string(stringError('full name')),
  'hasSocial': z.boolean({
    required_error: `hasSocial is required`,
    invalid_type_error: `hasSocial must be a boolean`,
  }).optional(),
  'phone': z
    .string(stringError('phone')),
  'message': z.string(stringError('message')),
  'cf-turnstile-response': z.string(stringError('token')),
})

interface turnsiteBodyParameters {
  secret: string
  token: string
  ip: string
}
const turnstileValidate = async ({ secret, token, ip }: turnsiteBodyParameters): Promise<boolean> => {
  try {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const data = await $fetch(url, {
      method: 'POST',
      body: {
        secret,
        token,
        ip,
      },
    }) as { success: boolean }

    return data.success
  }
  catch (error) {
    throw createError({
      status: 500,
      message: 'Turnstile validation failed. Request error: ' + JSON.stringify(error),
    })
  }
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, feedbackSchema.parse)
  const token = process.env.TELEGRAM_API_TOKEN ?? ''
  const secret = process.env.TUNRNSTILE_SECRET_KEY ?? ''
  const apiURL = `https://api.telegram.org/bot${token}/sendMessage`
  const headers = getRequestHeaders(event)
  const validateParameters = {
    secret,
    token: body['cf-turnstile-response'],
    ip: headers['CF-Connecting-IP'] ?? '',
  }

  if (await turnstileValidate(validateParameters)) {
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
