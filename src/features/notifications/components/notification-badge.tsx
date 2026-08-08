import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NotificationBadgeProps {
  count: number
  className?: string
}

/** Small unread-count pill anchored to the bell icon — renders nothing at zero. */
export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (count <= 0) return null

  return (
    <Badge
      variant="destructive"
      className={cn(
        'absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none',
        className,
      )}
      aria-hidden
    >
      {count > 9 ? '9+' : count}
    </Badge>
  )
}
