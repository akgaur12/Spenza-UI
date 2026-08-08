import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteNotification, markAllNotificationsRead, markNotificationRead } from '@/features/notifications/api/notifications.api'
import type { Notification, NotificationListResponse, UnreadCountResponse } from '@/features/notifications/types'
import { getErrorMessage } from '@/lib/errors'
import { notificationsKeys } from './query-keys'

type NotificationsPage = InfiniteData<NotificationListResponse>

/** Patches the small "recent" list (bell popover) in place — a no-op if it isn't cached. */
function patchRecentNotifications(
  queryClient: QueryClient,
  updater: (data: NotificationListResponse) => NotificationListResponse,
) {
  queryClient.setQueriesData<NotificationListResponse>({ queryKey: notificationsKeys.recent() }, (data) =>
    data ? updater(data) : data,
  )
}

/** Patches every cached infinite notification-list page (the full Notification Center, across filters). */
function patchInfiniteNotifications(
  queryClient: QueryClient,
  updater: (page: NotificationListResponse) => NotificationListResponse,
) {
  queryClient.setQueriesData<NotificationsPage>(
    { queryKey: notificationsKeys.all, predicate: (query) => query.queryKey[1] === 'infinite' },
    (data) => (data ? { ...data, pages: data.pages.map(updater) } : data),
  )
}

function adjustUnreadCount(queryClient: QueryClient, delta: number) {
  queryClient.setQueryData<UnreadCountResponse>(notificationsKeys.unreadCount(), (data) =>
    data ? { count: Math.max(0, data.count + delta) } : data,
  )
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: string) => markNotificationRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: notificationsKeys.all })

      let wasUnread = false
      const markRead = (item: Notification): Notification => {
        if (item.id !== notificationId) return item
        if (!item.is_read) wasUnread = true
        return { ...item, is_read: true, read_at: new Date().toISOString() }
      }

      patchRecentNotifications(queryClient, (data) => ({ ...data, items: data.items.map(markRead) }))
      patchInfiniteNotifications(queryClient, (page) => ({ ...page, items: page.items.map(markRead) }))
      if (wasUnread) adjustUnreadCount(queryClient, -1)
    },
    onError: (error) => {
      toast.error('Could not mark notification as read', { description: getErrorMessage(error) })
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all })
    },
  })
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationsKeys.all })

      const markAllRead = (item: Notification): Notification =>
        item.is_read ? item : { ...item, is_read: true, read_at: new Date().toISOString() }

      patchRecentNotifications(queryClient, (data) => ({ ...data, items: data.items.map(markAllRead) }))
      patchInfiniteNotifications(queryClient, (page) => ({ ...page, items: page.items.map(markAllRead) }))
      queryClient.setQueryData<UnreadCountResponse>(notificationsKeys.unreadCount(), { count: 0 })
    },
    onSuccess: () => {
      toast.success('All notifications marked as read')
    },
    onError: (error) => {
      toast.error('Could not mark all notifications as read', { description: getErrorMessage(error) })
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all })
    },
  })
}

export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: notificationsKeys.all })

      let wasUnread = false
      const removeItem = (data: NotificationListResponse): NotificationListResponse => {
        const target = data.items.find((item) => item.id === notificationId)
        if (!target) return data
        if (!target.is_read) wasUnread = true
        return {
          ...data,
          items: data.items.filter((item) => item.id !== notificationId),
          total: Math.max(0, data.total - 1),
        }
      }

      patchRecentNotifications(queryClient, removeItem)
      patchInfiniteNotifications(queryClient, removeItem)
      if (wasUnread) adjustUnreadCount(queryClient, -1)
    },
    onSuccess: () => {
      toast.success('Notification deleted')
    },
    onError: (error) => {
      toast.error('Could not delete notification', { description: getErrorMessage(error) })
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all })
    },
  })
}
