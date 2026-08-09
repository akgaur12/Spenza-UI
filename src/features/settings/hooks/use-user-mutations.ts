import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { changePassword } from '@/features/auth/api/auth.api'
import { authKeys } from '@/features/auth/hooks/query-keys'
import { notificationsKeys } from '@/features/notifications/hooks/query-keys'
import { deleteUser, updateProfile, updateUsername } from '@/features/settings/api/users.api'
import { getErrorCode, getErrorMessage } from '@/lib/errors'

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(authKeys.me(), (old) => old && { ...old, full_name: updated.full_name })
      toast.success('Profile updated')
    },
    onError: (error) => {
      toast.error('Could not update profile', { description: getErrorMessage(error) })
    },
  })
}

export function useUpdateUsernameMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUsername,
    onSuccess: (updated) => {
      queryClient.setQueryData(authKeys.me(), (old) => old && { ...old, username: updated.username })
      toast.success('Username updated')
    },
    onError: (error) => {
      if (getErrorCode(error) === 'USERNAME_ALREADY_EXISTS') {
        toast.error('Username unavailable', { description: 'That username is already taken.' })
        return
      }
      toast.error('Could not update username', { description: getErrorMessage(error) })
    },
  })
}

/**
 * A dedicated hook (not `useChangePasswordMutation` from the auth feature) because that one
 * clears the session on success for the "forgot password" flow — Settings' Security tab
 * explicitly must NOT log the user out after a change-password.
 */
export function useSettingsChangePasswordMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password updated')
      // The backend also creates a PASSWORD_CHANGED notification as a side effect of
      // this call — refetch now instead of waiting for the bell's next poll interval.
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all })
    },
    onError: (error) => {
      toast.error('Could not update password', { description: getErrorMessage(error) })
    },
  })
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      queryClient.clear()
      toast.success('Account deleted')
    },
    onError: (error) => {
      toast.error('Could not delete account', { description: getErrorMessage(error) })
    },
  })
}
