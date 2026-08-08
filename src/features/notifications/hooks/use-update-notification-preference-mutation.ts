import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateNotificationPreference } from '@/features/notifications/api/notifications.api'
import type {
  NotificationPreferenceListResponse,
  NotificationPreferenceUpdateRequest,
  NotificationType,
} from '@/features/notifications/types'
import { getErrorMessage } from '@/lib/errors'
import { notificationsKeys } from './query-keys'

export function useUpdateNotificationPreferenceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { notificationType: NotificationType; payload: NotificationPreferenceUpdateRequest }) =>
      updateNotificationPreference(variables.notificationType, variables.payload),
    onMutate: async ({ notificationType, payload }) => {
      await queryClient.cancelQueries({ queryKey: notificationsKeys.preferences() })

      const snapshot = queryClient.getQueryData<NotificationPreferenceListResponse>(notificationsKeys.preferences())

      queryClient.setQueryData<NotificationPreferenceListResponse>(notificationsKeys.preferences(), (data) =>
        data
          ? {
              items: data.items.map((item) =>
                item.notification_type === notificationType ? { ...item, ...payload, is_default: false } : item,
              ),
            }
          : data,
      )

      return { snapshot }
    },
    onError: (error, _variables, context) => {
      if (context?.snapshot) queryClient.setQueryData(notificationsKeys.preferences(), context.snapshot)
      toast.error('Could not update notification preference', { description: getErrorMessage(error) })
    },
  })
}
