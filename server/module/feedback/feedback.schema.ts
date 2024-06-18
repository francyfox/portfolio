import { z } from 'zod'
import { stringError } from '~/server/helpers'

export default z.object({
  company: z.string(stringError('company')).optional(),
  fullName: z.string(stringError('full name')),
  hasSocial: z.boolean({
    required_error: `hasSocial is required`,
    invalid_type_error: `hasSocial must be a boolean`,
  }).optional(),
  phone: z
    .string(stringError('phone')),
  message: z.string(stringError('message')),
  token: z.string(stringError('token')),
})
