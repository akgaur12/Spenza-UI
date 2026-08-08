import { useQuery } from '@tanstack/react-query'
import { listNotifications } from '@/features/notifications/api/notifications.api'
import { notificationsKeys } from './query-keys'

/** Powers the bell popover/sheet — a small, non-paginated slice, never the full history. */
const RECENT_NOTIFICATIONS_LIMIT = 6

export function useRecentNotifications() {
  return useQuery({
    queryKey: notificationsKeys.recent(),
    queryFn: () => listNotifications({ page: 1, page_size: RECENT_NOTIFICATIONS_LIMIT }),
    staleTime: 30 * 1000,
  })
}
