export interface UpdateUsernameRequest {
  new_username: string
}

export interface UpdateProfileRequest {
  full_name?: string | null
}

export interface DeleteUserRequest {
  current_password: string
}

export type SettingsSectionKey = 'profile' | 'appearance' | 'security' | 'account'
