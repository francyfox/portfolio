interface turnstileBodyParameters {
  secret: string
  token: string
  ip: string
}

interface turnstileResponse {
  success: boolean
}
export const turnstileValidate = async ({ secret, token, ip }: turnstileBodyParameters): Promise<turnstileResponse> => {
  try {
    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)
    formData.append('remoteip', ip)
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const data = await $fetch(url, {
      method: 'POST',
      body: formData,
    }) as turnstileResponse

    console.log(data, secret)
    return data
  }
  catch (error) {
    throw createError({
      status: 500,
      message: 'Turnstile validation failed. Request error: \n' + JSON.stringify(error, undefined, 2),
    })
  }
}
