import { API_ENDPOINTS } from '@/config'
import type {
  AdminCategoryCreateRequest,
  AdminCategoryListParams,
  AdminCategoryUpdateRequest,
  SystemCategoryResponse,
} from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.admin

interface AdminCategoryListResponse {
  items: SystemCategoryResponse[]
}

export async function listAdminCategories(params: AdminCategoryListParams = {}): Promise<SystemCategoryResponse[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<AdminCategoryListResponse>>(endpoints.categories, { params })
  return data.data.items
}

export async function createAdminCategory(payload: AdminCategoryCreateRequest): Promise<SystemCategoryResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<SystemCategoryResponse>>(endpoints.categories, payload)
  return data.data
}

export async function updateAdminCategory(
  categoryId: string,
  payload: AdminCategoryUpdateRequest,
): Promise<SystemCategoryResponse> {
  const { data } = await apiClient.patch<ApiSuccessResponse<SystemCategoryResponse>>(
    endpoints.category(categoryId),
    payload,
  )
  return data.data
}

export async function deleteAdminCategory(categoryId: string): Promise<void> {
  await apiClient.delete(endpoints.category(categoryId))
}
