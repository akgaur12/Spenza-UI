import { API_ENDPOINTS } from '@/config'
import type {
  CalendarHeatmapParams,
  CalendarHeatmapResponse,
  CategoryAnalyticsParams,
  CategoryAnalyticsResponse,
  TrendAnalyticsParams,
  TrendAnalyticsResponse,
} from '@/features/analytics/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function getTrendAnalytics(params: TrendAnalyticsParams): Promise<TrendAnalyticsResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<TrendAnalyticsResponse>>(API_ENDPOINTS.analytics.trends, {
    params,
  })
  return data.data
}

export async function getCategoryAnalytics(
  params: CategoryAnalyticsParams = {},
): Promise<CategoryAnalyticsResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<CategoryAnalyticsResponse>>(
    API_ENDPOINTS.analytics.categories,
    { params },
  )
  return data.data
}

export async function getCalendarHeatmap(params: CalendarHeatmapParams = {}): Promise<CalendarHeatmapResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<CalendarHeatmapResponse>>(
    API_ENDPOINTS.analytics.calendarHeatmap,
    { params },
  )
  return data.data
}
