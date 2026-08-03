import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  logoutAllDevices,
  resendSignupOtp,
  resetPassword,
  signup,
  verifyResetOtp,
  verifySignupOtp,
} from '@/features/auth/api/auth.api'
import { getErrorCode, getErrorMessage } from '@/lib/errors'
import { authKeys } from './query-keys'

export function useSignupMutation() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Account created', { description: 'Check your email for a verification code.' })
    },
    onError: (error) => {
      toast.error('Signup failed', { description: getErrorMessage(error) })
    },
  })
}

export function useVerifySignupOtpMutation() {
  return useMutation({
    mutationFn: verifySignupOtp,
    onSuccess: () => {
      toast.success('Email verified', { description: 'You can now log in to your account.' })
    },
    onError: (error) => {
      toast.error('Verification failed', { description: getErrorMessage(error) })
    },
  })
}

export function useResendSignupOtpMutation() {
  return useMutation({
    mutationFn: resendSignupOtp,
    onSuccess: () => {
      toast.success('Code resent', { description: 'Check your inbox for a new verification code.' })
    },
    onError: (error) => {
      toast.error('Could not resend code', { description: getErrorMessage(error) })
    },
  })
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user)
      toast.success('Login successful', { description: `Welcome back, ${user.username}.` })
    },
    onError: (error) => {
      toast.error('Login failed', { description: getErrorMessage(error) })
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      queryClient.clear()
      toast.success('Logged out')
    },
    onError: (error) => {
      toast.error('Logout failed', { description: getErrorMessage(error) })
    },
  })
}

export function useLogoutAllDevicesMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logoutAllDevices,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      queryClient.clear()
      toast.success('Logged out of all devices')
    },
    onError: (error) => {
      toast.error('Action failed', { description: getErrorMessage(error) })
    },
  })
}

export function useForgotPasswordMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('OTP sent', { description: 'Check your email for the password reset code.' })
    },
    onError: (error) => {
      if (getErrorCode(error) === 'USER_NOT_FOUND') {
        toast.error("Account doesn't exist", {
          description: 'No account is registered with that email.',
          action: { label: 'Create account', onClick: () => navigate({ to: '/signup' }) },
        })
        return
      }
      toast.error('Something went wrong', { description: getErrorMessage(error) })
    },
  })
}

export function useVerifyResetOtpMutation() {
  return useMutation({
    mutationFn: verifyResetOtp,
    onError: (error) => {
      toast.error('Invalid OTP', { description: getErrorMessage(error) })
    },
  })
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset', { description: 'You can now log in with your new password.' })
    },
    onError: (error) => {
      toast.error('Reset failed', { description: getErrorMessage(error) })
    },
  })
}

export function useChangePasswordMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      toast.success('Password changed', { description: 'Please log in again with your new password.' })
    },
    onError: (error) => {
      toast.error('Change failed', { description: getErrorMessage(error) })
    },
  })
}
