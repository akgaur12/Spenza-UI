import { API_ENDPOINTS } from '@/config'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'
import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  ResetTokenResponse,
  SignupRequest,
  UserMe,
  UserPublic,
  VerifyResetOtpRequest,
  VerifySignupOtpRequest,
} from '@/features/auth/types'

const endpoints = API_ENDPOINTS.auth

export async function signup(payload: SignupRequest): Promise<UserPublic> {
  const { data } = await apiClient.post<ApiSuccessResponse<UserPublic>>(endpoints.signup, payload)
  return data.data
}

export async function verifySignupOtp(payload: VerifySignupOtpRequest): Promise<UserPublic> {
  const { data } = await apiClient.post<ApiSuccessResponse<UserPublic>>(endpoints.verifySignupOtp, payload)
  return data.data
}

/**
 * NOTE: the backend defines a `ResendOTPRequest` schema and an
 * `OTPResendCooldownError`, but no `/resend-otp` route is wired up yet
 * (verified against src/modules/users/user_router.py). This call is wired
 * ahead of that endpoint landing — until then it will fail with a 404.
 */
export async function resendSignupOtp(payload: { email: string }): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.resendSignupOtp, payload)
}

export async function login(payload: LoginRequest): Promise<UserPublic> {
  const { data } = await apiClient.post<ApiSuccessResponse<UserPublic>>(endpoints.login, payload)
  return data.data
}

export async function refreshToken(): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.refreshToken)
}

export async function logout(): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.logout)
}

export async function logoutAllDevices(): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.logoutAllDevices)
}

export async function getMe(): Promise<UserMe> {
  const { data } = await apiClient.get<ApiSuccessResponse<UserMe>>(endpoints.me)
  return data.data
}

export async function forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.forgotPassword, payload)
}

export async function verifyResetOtp(payload: VerifyResetOtpRequest): Promise<ResetTokenResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<ResetTokenResponse>>(endpoints.verifyResetOtp, payload)
  return data.data
}

export async function resetPassword(payload: ResetPasswordRequest): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.resetPassword, payload)
}

export async function changePassword(payload: ChangePasswordRequest): Promise<void> {
  await apiClient.post<ApiSuccessResponse<null>>(endpoints.changePassword, payload)
}
