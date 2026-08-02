import { z } from 'zod'
import { otpSchema } from './shared'

export const otpFormSchema = z.object({
  otp: otpSchema,
})

export type OtpFormValues = z.infer<typeof otpFormSchema>
