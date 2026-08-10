import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { changePassword } from '@/features/auth/api/auth.api'
import { authKeys } from '@/features/auth/hooks/query-keys'
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
 * The backend's change-password endpoint revokes every session for the user and clears
 * this browser's auth cookies as part of the same response — the current session is
 * already dead once this call succeeds, so we clear the cache and send the user to
 * log back in rather than leaving them on a page that looks authenticated but isn't.
 */
export function useSettingsChangePasswordMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      queryClient.clear()
      toast.success('Password updated', { description: 'Please log in again with your new password.' })
      navigate({ to: '/login' })
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
      // The backend emails an expense-data export before deleting the account, and only
      // deletes if that email send succeeds — this error means the account is untouched.
      if (getErrorCode(error) === 'ACCOUNT_DATA_EXPORT_FAILED') {
        toast.error('Could not send your data export', {
          description: "We couldn't email your expense data, so your account was not deleted. Please try again.",
        })
        return
      }
      toast.error('Could not delete account', { description: getErrorMessage(error) })
    },
  })
}
