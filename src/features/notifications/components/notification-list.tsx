import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SectionError } from '@/components/common/section-error'
import { LoadingMoreIndicator } from '@/features/expenses/components/loading-more-indicator'
import { NotificationEmptyState } from '@/features/notifications/components/notification-empty-state'
import { NotificationItem } from '@/features/notifications/components/notification-item'
import { NotificationSkeleton } from '@/features/notifications/components/notification-skeleton'
import { useInfiniteNotifications } from '@/features/notifications/hooks/use-infinite-notifications'
import { useDeleteNotificationMutation, useMarkNotificationReadMutation } from '@/features/notifications/hooks/use-notification-mutations'
import type { Notification, NotificationInfiniteParams } from '@/features/notifications/types'
import { groupNotificationsByDay } from '@/features/notifications/utils/group-notifications'
import { resolveNotificationAction } from '@/features/notifications/utils/notification-action-resolver'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface NotificationListProps {
  params: NotificationInfiniteParams
  emptyVariant: 'all' | 'unread'
}

export function NotificationList({ params, emptyVariant }: NotificationListProps) {
  const query = useInfiniteNotifications(params)
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query
  const { ref: sentinelRef, isInView } = useInView<HTMLDivElement>('300px')
  const navigate = useNavigate()
  const markReadMutation = useMarkNotificationReadMutation()
  const deleteMutation = useDeleteNotificationMutation()

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (query.isPending) return <NotificationSkeleton />

  if (query.isError) {
    return <SectionError message="Unable to load notifications." onRetry={() => query.refetch()} />
  }

  const total = query.data.pages[0]?.total ?? 0
  if (total === 0) return <NotificationEmptyState variant={emptyVariant} />

  const items = query.data.pages.flatMap((page) => page.items)
  const groups = groupNotificationsByDay(items)

  function handleClick(notification: Notification) {
    if (!notification.is_read) markReadMutation.mutate(notification.id)
    const action = resolveNotificationAction(notification)
    if (action) navigate({ to: action.to })
  }

  return (
    <div className={cn('space-y-6 transition-opacity', query.isPlaceholderData && 'opacity-60')}>
      {groups.map((group) => (
        <div key={group.label} className="space-y-1">
          <p className="px-2 text-sm font-medium text-muted-foreground">{group.label}</p>
          <div className="space-y-1">
            {group.items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleClick(notification)}
                onMarkRead={() => markReadMutation.mutate(notification.id)}
                onDelete={() => deleteMutation.mutate(notification.id)}
              />
            ))}
          </div>
        </div>
      ))}

      <div ref={sentinelRef} aria-hidden />
      {query.isFetchingNextPage && <LoadingMoreIndicator />}
    </div>
  )
}
