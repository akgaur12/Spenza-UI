import { useQuery } from '@tanstack/react-query'
import { getUnreadNotificationCount } from '@/features/notifications/api/notifications.api'
import { notificationsKeys } from './query-keys'

/** No WebSocket/SSE push exists on the backend yet, so this polls at a deliberately
 * conservative interval — swap for a subscription once real-time delivery lands. */
const UNREAD_COUNT_POLL_INTERVAL = 60 * 1000

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
    staleTime: 30 * 1000,
    refetchInterval: UNREAD_COUNT_POLL_INTERVAL,
    refetchOnWindowFocus: true,
  })
}
