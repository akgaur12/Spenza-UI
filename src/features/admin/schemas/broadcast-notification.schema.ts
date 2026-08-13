import { z } from 'zod'

export const broadcastNotificationFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(255, 'Title is too long'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message is too long'),
  priority: z.enum(['low', 'normal', 'high', 'critical']),
})

export type BroadcastNotificationFormValues = z.infer<typeof broadcastNotificationFormSchema>
