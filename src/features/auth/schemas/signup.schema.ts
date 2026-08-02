import { z } from 'zod'
import { emailSchema, strongPasswordSchema, usernameSchema } from './shared'

export const signupSchema = z
  .object({
    fullName: z.string().trim().max(150, 'Full name is too long').optional(),
    username: usernameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
