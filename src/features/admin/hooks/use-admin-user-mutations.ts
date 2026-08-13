import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAdminUser, setUserActive, unlockUser, updateUserRole } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type { SetUserActiveRequest, UpdateUserRoleRequest } from '@/features/admin/types'
import { getErrorCode, getErrorMessage } from '@/lib/errors'

function ownAccountErrorMessage(error: unknown, fallback: string): string {
  if (getErrorCode(error) === 'CANNOT_MODIFY_OWN_ACCOUNT') {
    return "You can't perform this action on your own account."
  }
  return getErrorMessage(error, fallback)
}

export function useSetUserActiveMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { userId: string; payload: SetUserActiveRequest }) =>
      setUserActive(variables.userId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
    onError: (error) => {
      toast.error('Could not update user', {
        description: ownAccountErrorMessage(error, 'Something went wrong. Please try again.'),
      })
    },
  })
}

export function useUnlockUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => unlockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('User unlocked')
    },
    onError: (error) => {
      toast.error('Could not unlock user', { description: getErrorMessage(error) })
    },
  })
}

export function useUpdateUserRoleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { userId: string; payload: UpdateUserRoleRequest }) =>
      updateUserRole(variables.userId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('User role updated')
    },
    onError: (error) => {
      const description =
        getErrorCode(error) === 'CANNOT_DEMOTE_LAST_ADMIN'
          ? "This is the only remaining admin — promote someone else first."
          : getErrorMessage(error)
      toast.error('Could not update role', { description })
    },
  })
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => deleteAdminUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error('Could not delete user', {
        description: ownAccountErrorMessage(error, 'Something went wrong. Please try again.'),
      })
    },
  })
}
