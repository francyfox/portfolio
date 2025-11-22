import { randomUUID } from 'node:crypto'

interface turnstileBodyParameters {
  secret: string
  token: string
  ip: string
}

interface turnstileResponse {
  success: boolean
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('cf-connecting-ip') || 'unknown';
}

export function createErrorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export const turnstileValidate = async ({ secret, token, ip }: turnstileBodyParameters): Promise<turnstileResponse | undefined> => {
  try {
    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)
    formData.append('remoteip', ip)
    const idempotencyKey = randomUUID()
    formData.append('idempotency_key', idempotencyKey)
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) new Error(response.statusText)
    const data = await response.json() as unknown as turnstileResponse

    return data;
  }
  catch (error) {
    createErrorResponse(500, 'Turnstile validation failed. Request error: \n' + JSON.stringify(error, undefined, 2))
  }
}