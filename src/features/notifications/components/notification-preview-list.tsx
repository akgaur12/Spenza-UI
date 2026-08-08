import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { NotificationItem } from '@/features/notifications/components/notification-item'
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from '@/features/notifications/hooks/use-notification-mutations'
import { useRecentNotifications } from '@/features/notifications/hooks/use-recent-notifications'
import type { Notification } from '@/features/notifications/types'
import { resolveNotificationAction } from '@/features/notifications/utils/notification-action-resolver'

interface NotificationPreviewListProps {
  /** Closes the popover/sheet the list is rendered inside. */
  onClose: () => void
}

export function NotificationPreviewList({ onClose }: NotificationPreviewListProps) {
  const query = useRecentNotifications()
  const navigate = useNavigate()
  const markReadMutation = useMarkNotificationReadMutation()
  const markAllReadMutation = useMarkAllNotificationsReadMutation()

  const items = query.data?.items ?? []
  const hasUnread = items.some((item) => !item.is_read)

  function handleItemClick(notification: Notification) {
    if (!notification.is_read) markReadMutation.mutate(notification.id)

    const action = resolveNotificationAction(notification)
    if (action) {
      onClose()
      navigate({ to: action.to })
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 py-2.5">
        <p className="text-sm font-semibold">Notifications</p>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto px-1.5 py-1 text-xs"
          disabled={!hasUnread || markAllReadMutation.isPending}
          onClick={() => markAllReadMutation.mutate()}
        >
          Mark all read
        </Button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto border-t border-border">
        {query.isPending && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {query.isError && <SectionError message="Unable to load notifications." onRetry={() => query.refetch()} />}

        {query.isSuccess && items.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">You're all caught up.</div>
        )}

        {query.isSuccess && items.length > 0 && (
          <div className="space-y-0.5 p-1.5">
            {items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                variant="compact"
                onClick={() => handleItemClick(notification)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-1.5">
        <Button variant="ghost" size="sm" className="w-full justify-center text-sm" asChild onClick={onClose}>
          <Link to="/notifications">View all notifications</Link>
        </Button>
      </div>
    </div>
  )
}
