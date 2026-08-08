import { Button } from '@/components/ui/button'
import { NotificationFilters } from '@/features/notifications/components/notification-filters'
import { NotificationList } from '@/features/notifications/components/notification-list'
import { useMarkAllNotificationsReadMutation } from '@/features/notifications/hooks/use-notification-mutations'
import { useNotificationFilters } from '@/features/notifications/hooks/use-notification-filters'
import { useUnreadNotificationCount } from '@/features/notifications/hooks/use-unread-count'

export function NotificationCenterPage() {
  const filters = useNotificationFilters()
  const unreadCountQuery = useUnreadNotificationCount()
  const markAllReadMutation = useMarkAllNotificationsReadMutation()
  const hasUnread = (unreadCountQuery.data?.count ?? 0) > 0

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasUnread || markAllReadMutation.isPending}
          onClick={() => markAllReadMutation.mutate()}
        >
          Mark all as read
        </Button>
      </div>

      <NotificationFilters value={filters.filter} onChange={filters.setFilter} />

      <NotificationList params={filters.params} emptyVariant={filters.filter} />
    </div>
  )
}
