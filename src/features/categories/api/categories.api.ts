import { API_ENDPOINTS } from '@/config'
import type {
  CategoryCreateRequest,
  CategoryListParams,
  CategoryListResponse,
  CategoryResponse,
  CategoryUpdateRequest,
} from '@/features/categories/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function listCategories(params: CategoryListParams = {}): Promise<CategoryListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<CategoryListResponse>>(API_ENDPOINTS.categories.list, {
    params,
  })
  return data.data
}

export async function createCategory(payload: CategoryCreateRequest): Promise<CategoryResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<CategoryResponse>>(API_ENDPOINTS.categories.list, payload)
  return data.data
}

export async function updateCategory(categoryId: string, payload: CategoryUpdateRequest): Promise<CategoryResponse> {
  const { data } = await apiClient.patch<ApiSuccessResponse<CategoryResponse>>(
    API_ENDPOINTS.categories.detail(categoryId),
    payload,
  )
  return data.data
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.categories.detail(categoryId))
}
