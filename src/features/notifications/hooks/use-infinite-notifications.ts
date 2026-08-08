import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { listNotifications } from '@/features/notifications/api/notifications.api'
import type { NotificationInfiniteParams } from '@/features/notifications/types'
import { notificationsKeys } from './query-keys'

export const NOTIFICATIONS_PAGE_SIZE = 20

export function useInfiniteNotifications(params: NotificationInfiniteParams) {
  return useInfiniteQuery({
    queryKey: notificationsKeys.infinite(params),
    queryFn: ({ pageParam }) => listNotifications({ ...params, page: pageParam, page_size: NOTIFICATIONS_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  })
}
