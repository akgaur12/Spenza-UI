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

/** The subset of a user's own AI assistant status/usage exposed via `GET /api/users/me` — deliberately omits the per-minute limit, which isn't meaningful in a profile-style UI. */
export interface AIAssistantMeStatus {
  enabled: boolean
  max_messages_per_day: number | null
  max_messages_per_month: number | null
  max_new_chats_per_day: number | null
  max_new_chats_per_month: number | null
  messages_sent_today: number
  messages_sent_this_month: number
  chats_created_today: number
  chats_created_this_month: number
}

/** `GET /api/users/me`'s actual response shape — `UserMe` plus the caller's own AI assistant status. */
export interface UserMeResponse extends UserMe {
  ai_assistant: AIAssistantMeStatus
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
