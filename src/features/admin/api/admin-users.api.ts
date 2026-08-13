import { API_ENDPOINTS } from '@/config'
import type {
  AdminUserResponse,
  AdminUsersListParams,
  PaginatedUsersResponse,
  RevokedSessionsResponse,
  SessionListResponse,
  SetUserActiveRequest,
  UpdateUserRoleRequest,
} from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.admin

export async function listAdminUsers(params: AdminUsersListParams): Promise<PaginatedUsersResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<PaginatedUsersResponse>>(endpoints.users, { params })
  return data.data
}

export async function getAdminUser(userId: string): Promise<AdminUserResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<AdminUserResponse>>(endpoints.user(userId))
  return data.data
}

export async function setUserActive(userId: string, payload: SetUserActiveRequest): Promise<AdminUserResponse> {
  const { data } = await apiClient.patch<ApiSuccessResponse<AdminUserResponse>>(
    endpoints.setUserActive(userId),
    payload,
  )
  return data.data
}

export async function unlockUser(userId: string): Promise<AdminUserResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<AdminUserResponse>>(endpoints.unlockUser(userId))
  return data.data
}

export async function deleteAdminUser(userId: string): Promise<void> {
  await apiClient.delete(endpoints.user(userId))
}

export async function updateUserRole(userId: string, payload: UpdateUserRoleRequest): Promise<AdminUserResponse> {
  const { data } = await apiClient.patch<ApiSuccessResponse<AdminUserResponse>>(
    endpoints.updateUserRole(userId),
    payload,
  )
  return data.data
}

export async function listUserSessions(userId: string): Promise<SessionListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<SessionListResponse>>(endpoints.userSessions(userId))
  return data.data
}

export async function revokeUserSessions(userId: string): Promise<RevokedSessionsResponse> {
  const { data } = await apiClient.delete<ApiSuccessResponse<RevokedSessionsResponse>>(endpoints.userSessions(userId))
  return data.data
}
