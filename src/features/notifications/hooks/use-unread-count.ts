import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { getUnreadNotificationCount } from '@/features/notifications/api/notifications.api'
import { notificationsKeys } from './query-keys'

/** No WebSocket/SSE push exists on the backend yet, so this polls at a deliberately
 * conservative interval — swap for a subscription once real-time delivery lands. */
const UNREAD_COUNT_POLL_INTERVAL = 60 * 1000

export function useUnreadNotificationCount() {
  const queryClient = useQueryClient()
  const previousCountRef = useRef<number | null>(null)

  const query = useQuery({
    queryKey: notificationsKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
    staleTime: 30 * 1000,
    refetchInterval: UNREAD_COUNT_POLL_INTERVAL,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    const count = query.data?.count
    if (count === undefined) return

    // The bell (this hook) is mounted on every page, so it's the one reliable place to notice
    // a notification arriving passively (poll/focus refetch) — the recent-list and full-history
    // queries are separate cache entries that wouldn't otherwise learn about it until their own
    // staleTime elapses, which is what made "View all notifications" show stale data.
    if (previousCountRef.current !== null && count > previousCountRef.current) {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.recent() })
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
        predicate: (q) => q.queryKey[1] === 'infinite',
      })
    }
    previousCountRef.current = count
  }, [query.data?.count, queryClient])

  return query
}
