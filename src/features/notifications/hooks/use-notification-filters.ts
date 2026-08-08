import { useMemo, useState } from 'react'
import type { NotificationInfiniteParams } from '@/features/notifications/types'

export type NotificationFilter = 'all' | 'unread'

export function useNotificationFilters() {
  const [filter, setFilter] = useState<NotificationFilter>('all')

  const params = useMemo<NotificationInfiniteParams>(
    () => ({ is_read: filter === 'unread' ? false : undefined }),
    [filter],
  )

  return { filter, setFilter, params }
}
