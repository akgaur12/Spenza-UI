import { useQuery } from '@tanstack/react-query'
import { listNotificationPreferences } from '@/features/notifications/api/notifications.api'
import { notificationsKeys } from './query-keys'

export function useNotificationPreferences() {
  return useQuery({
    queryKey: notificationsKeys.preferences(),
    queryFn: listNotificationPreferences,
    staleTime: 60 * 1000,
  })
}
