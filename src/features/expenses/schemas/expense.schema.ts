import { z } from 'zod'

export const expenseFormSchema = z.object({
  spentAt: z.date({ required_error: 'Date is required' }),
  category: z.object({
    id: z.string().nullable(),
    name: z.string().min(1, 'Category is required'),
    icon: z.string().nullable(),
  }),
  description: z.string().trim().min(1, 'Description is required').max(255, 'Keep it under 255 characters'),
  amount: z
    .string()
    .trim()
    .min(1, 'Amount is required')
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Enter an amount greater than 0'),
})

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>
