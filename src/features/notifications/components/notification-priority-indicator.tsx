import type { NotificationPriority } from '@/features/notifications/types'
import { cn } from '@/lib/utils'

interface NotificationPriorityIndicatorProps {
  priority: NotificationPriority
  className?: string
}

/** Low/normal priority gets no visual treatment — only high/critical earn emphasis, and even
 * critical stays a small, clear marker rather than an alarmist banner. */
export function NotificationPriorityIndicator({ priority, className }: NotificationPriorityIndicatorProps) {
  if (priority !== 'high' && priority !== 'critical') return null

  return (
    <span
      className={cn('inline-block size-1.5 shrink-0 rounded-full', priority === 'critical' ? 'bg-destructive' : 'bg-primary', className)}
      aria-hidden
      title={priority === 'critical' ? 'Critical priority' : 'High priority'}
    />
  )
}
