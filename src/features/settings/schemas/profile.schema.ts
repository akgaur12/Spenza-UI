import { z } from 'zod'
import { usernameSchema } from '@/features/auth/schemas/shared'

export const profileSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(150, 'Full name is too long'),
  username: usernameSchema,
})

export type ProfileFormValues = z.infer<typeof profileSchema>
