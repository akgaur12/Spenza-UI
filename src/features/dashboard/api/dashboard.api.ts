import { API_ENDPOINTS } from '@/config'
import type { DashboardSummaryResponse } from '@/features/dashboard/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<DashboardSummaryResponse>>(
    API_ENDPOINTS.dashboard.summary,
  )
  return data.data
}
