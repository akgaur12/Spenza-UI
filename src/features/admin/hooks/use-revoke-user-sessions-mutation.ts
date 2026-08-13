import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { revokeUserSessions } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'

export function useRevokeUserSessionsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => revokeUserSessions(userId),
    onSuccess: (result, userId) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.userSessions(userId) })
      toast.success(`Signed out of ${result.revoked} ${result.revoked === 1 ? 'session' : 'sessions'}`)
    },
    onError: (error) => {
      toast.error('Could not revoke sessions', { description: getErrorMessage(error) })
    },
  })
}
