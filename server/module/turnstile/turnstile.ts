interface turnstileBodyParameters {
  secret: string
  token: string
  ip: string
}
export const turnstileValidate = async ({ secret, token, ip }: turnstileBodyParameters): Promise<boolean> => {
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
      message: 'Turnstile validation failed. Request error: \n' + JSON.stringify(error, undefined, 2),
    })
  }
}
