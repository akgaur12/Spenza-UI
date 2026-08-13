import { z } from 'zod'

export const adminCategoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Category name is required').max(100, 'Category name is too long'),
  icon: z.string().trim().max(10, 'Icon is too long').optional(),
})

export type AdminCategoryFormValues = z.infer<typeof adminCategoryFormSchema>
