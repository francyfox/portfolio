import { createErrorResponse, getClientIp, turnstileValidate } from '../../utils.ts'
import {
  getSecret,
} from 'astro:env/server';
import * as z from "zod";

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
    .string(stringError('phone')).optional(),
  email: z.string(stringError('email')),
  message: z.string(stringError('message')),
  token: z.string(stringError('token')),
})

export async function POST({ request }: { request: Request }) {
  let body: any;

  try {
    const rawBody = await request.json();

    body = feedbackSchema.parse(rawBody);
  } catch (e) {
    return createErrorResponse(400, (e as Error).message);
  }

  const token = getSecret('TELEGRAM_API_TOKEN') as string;
  const secret = getSecret('TUNRNSTILE_SECRET_KEY') as string;

  if (!token || !secret) {
    createErrorResponse(500, 'ENV token/secret required');
  }

  const apiURL = `https://api.telegram.org/bot${token}/sendMessage`;

  const ip = getClientIp(request);

  const validateParameters = {
    secret,
    token: body.token,
    ip,
  };

  const validate = await turnstileValidate(validateParameters);

  if (validate?.success) {
    try {
      const data = await fetch(apiURL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: 868_076_136,
          text: `Сообщение с сайта портфолио \n${JSON.stringify(body, undefined, 2)}`,
        }),
      });

      const responseData = await data.json();

      return new Response(
        JSON.stringify({ message: 'success', body: responseData }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (e) {
      console.error("Telegram error:", e);
      return createErrorResponse(500, 'Cant send message to Telegram bot');
    }
  }
  else {
    return createErrorResponse(403, 'Turnstile validation failed');
  }
}