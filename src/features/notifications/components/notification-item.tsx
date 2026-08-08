import { NotificationActions } from '@/features/notifications/components/notification-actions'
import { NotificationIcon } from '@/features/notifications/components/notification-icon'
import { NotificationPriorityIndicator } from '@/features/notifications/components/notification-priority-indicator'
import type { Notification } from '@/features/notifications/types'
import { formatRelativeTime } from '@/lib/format'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  notification: Notification
  onClick: () => void
  /** compact: bell popover/sheet, no actions menu. full: Notification Center page. */
  variant?: 'compact' | 'full'
  onMarkRead?: () => void
  onDelete?: () => void
}

export function NotificationItem({ notification, onClick, variant = 'full', onMarkRead, onDelete }: NotificationItemProps) {
  const isUnread = !notification.is_read

  return (
    <div
      className={cn(
        'group flex items-start gap-1 rounded-lg px-2 py-2 transition-colors',
        isUnread ? 'bg-primary/5' : '',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'flex min-w-0 flex-1 gap-3 rounded-md px-1 py-1 text-left transition-colors hover:bg-accent/60',
        )}
      >
        <NotificationIcon type={notification.type} />
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-1.5">
            {isUnread && <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />}
            <p className={cn('truncate text-sm', isUnread ? 'font-semibold text-foreground' : 'font-normal text-foreground/90')}>
              {notification.title}
            </p>
            <NotificationPriorityIndicator priority={notification.priority} />
          </div>
          <p className={cn('text-sm text-muted-foreground', variant === 'compact' && 'line-clamp-1')}>
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground">
            <time dateTime={notification.created_at}>{formatRelativeTime(notification.created_at)}</time>
            {isUnread && <span className="sr-only"> — unread</span>}
          </p>
        </div>
      </button>

      {variant === 'full' && onMarkRead && onDelete && (
        <NotificationActions isRead={notification.is_read} onMarkRead={onMarkRead} onDelete={onDelete} className="mt-1 shrink-0" />
      )}
    </div>
  )
}
