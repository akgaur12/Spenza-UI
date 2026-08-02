export interface UserPublic {
  id: string
  username: string
  email: string
  is_verified: boolean
  is_active: boolean
}

export interface UserMe extends UserPublic {
  full_name: string | null
}

export interface UserProfile extends UserMe {
  created_at: string
  updated_at: string
}

export interface SignupRequest {
  email: string
  username: string
  password: string
  full_name?: string
}

export interface VerifySignupOtpRequest {
  email: string
  otp: string
}

export interface LoginRequest {
  identifier: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyResetOtpRequest {
  email: string
  otp: string
}

export interface ResetTokenResponse {
  reset_token: string
  expires_in_minutes: number
}

export interface ResetPasswordRequest {
  reset_token: string
  new_password: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}
