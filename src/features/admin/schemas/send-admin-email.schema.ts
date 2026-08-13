import { z } from 'zod'

export const sendAdminEmailFormSchema = z.object({
  subject: z.string().trim().min(1, 'Subject is required').max(255, 'Subject is too long'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message is too long'),
})

export type SendAdminEmailFormValues = z.infer<typeof sendAdminEmailFormSchema>
