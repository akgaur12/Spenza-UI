import { z } from 'zod'

export const recurringExpenseFormSchema = z
  .object({
    description: z.string().trim().min(1, 'Description is required').max(255, 'Keep it under 255 characters'),
    category: z.object({
      id: z.string().min(1, 'Category is required'),
      name: z.string(),
      icon: z.string().nullable(),
    }),
    amount: z
      .string()
      .trim()
      .min(1, 'Amount is required')
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Enter an amount greater than 0'),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], {
      required_error: 'Select a frequency',
    }),
    generationMode: z.enum(['auto', 'reminder'], { required_error: 'Select a generation mode' }),
    startDate: z.date({ required_error: 'Start date is required' }),
    endDate: z.date().nullable(),
  })
  .refine((values) => !values.endDate || values.endDate >= values.startDate, {
    message: 'End date must be on or after the start date.',
    path: ['endDate'],
  })

export type RecurringExpenseFormValues = z.infer<typeof recurringExpenseFormSchema>
