import { z } from 'zod'
import { emailSchema, strongPasswordSchema, usernameSchema } from './shared'

export const signupSchema = z
  .object({
    fullName: z.string().trim().max(150, 'Full name is too long').optional(),
    username: usernameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((val) => val, {
      message: 'You must accept the Terms and Conditions and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
