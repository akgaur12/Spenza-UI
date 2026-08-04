import { API_ENDPOINTS } from '@/config'
import type { UserProfile, UserPublic } from '@/features/auth/types'
import type { DeleteUserRequest, UpdateProfileRequest, UpdateUsernameRequest } from '@/features/settings/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.user

export async function updateUsername(payload: UpdateUsernameRequest): Promise<UserPublic> {
  const { data } = await apiClient.patch<ApiSuccessResponse<UserPublic>>(endpoints.updateUsername, payload)
  return data.data
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
  const { data } = await apiClient.patch<ApiSuccessResponse<UserProfile>>(endpoints.updateProfile, payload)
  return data.data
}

export async function deleteUser(payload: DeleteUserRequest): Promise<void> {
  await apiClient.delete<ApiSuccessResponse<null>>(endpoints.deleteUser, { data: payload })
}
