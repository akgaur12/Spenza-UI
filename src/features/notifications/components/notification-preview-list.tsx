import { Link, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { NotificationItem } from '@/features/notifications/components/notification-item'
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from '@/features/notifications/hooks/use-notification-mutations'
import { notificationsKeys } from '@/features/notifications/hooks/query-keys'
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
  const queryClient = useQueryClient()
  const markReadMutation = useMarkNotificationReadMutation()
  const markAllReadMutation = useMarkAllNotificationsReadMutation()

  function handleViewAll() {
    onClose()
    // The full Notification Center's query is a separate cache entry from this preview list's —
    // force it stale so it refetches on mount instead of showing whatever it last cached, which
    // may predate a notification the user just saw appear here.
    queryClient.invalidateQueries({
      queryKey: notificationsKeys.all,
      predicate: (q) => q.queryKey[1] === 'infinite',
    })
  }

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

      <div className="scrollbar-thin max-h-[60vh] overflow-y-auto border-t border-border">
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
        <Button variant="ghost" size="sm" className="w-full justify-center text-sm" asChild onClick={handleViewAll}>
          <Link to="/notifications">View all notifications</Link>
        </Button>
      </div>
    </div>
  )
}
