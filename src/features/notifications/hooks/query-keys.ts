import type { NotificationInfiniteParams } from '@/features/notifications/types'

export const notificationsKeys = {
  all: ['notifications'] as const,
  infinite: (params: NotificationInfiniteParams) => [...notificationsKeys.all, 'infinite', params] as const,
  recent: () => [...notificationsKeys.all, 'recent'] as const,
  unreadCount: () => [...notificationsKeys.all, 'unread-count'] as const,
  preferences: () => [...notificationsKeys.all, 'preferences'] as const,
}
