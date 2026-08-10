import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, 'Enter your email or username'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
