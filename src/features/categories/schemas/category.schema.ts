import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Category name is required').max(100, 'Category name is too long'),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>
