import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { broadcastNotification } from '@/features/admin/api/admin-notifications.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'

export function useBroadcastNotificationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: broadcastNotification,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('Broadcast sent', {
        description: `Delivered to ${result.sent} of ${result.targeted} targeted users${result.skipped ? ` (${result.skipped} skipped by preference)` : ''}.`,
      })
    },
    onError: (error) => {
      toast.error('Could not send broadcast', { description: getErrorMessage(error) })
    },
  })
}
