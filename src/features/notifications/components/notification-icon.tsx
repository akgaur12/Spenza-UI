import type { NotificationType } from '@/features/notifications/types'
import { notificationIcon } from '@/features/notifications/utils/notification-type-map'
import { cn } from '@/lib/utils'

interface NotificationIconProps {
  type: NotificationType
  className?: string
}

export function NotificationIcon({ type, className }: NotificationIconProps) {
  const Icon = notificationIcon(type)

  return (
    <span
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground',
        className,
      )}
      aria-hidden
    >
      <Icon className="size-4" />
    </span>
  )
}
