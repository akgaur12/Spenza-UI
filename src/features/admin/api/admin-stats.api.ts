import { API_ENDPOINTS } from '@/config'
import type { AdminStatsOverview } from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function getAdminStatsOverview(): Promise<AdminStatsOverview> {
  const { data } = await apiClient.get<ApiSuccessResponse<AdminStatsOverview>>(API_ENDPOINTS.admin.statsOverview)
  return data.data
}
