import { API_ENDPOINTS } from '@/config'
import type {
  AIAssistantLogsParams,
  AIAssistantMessageLogListResponse,
  AIAssistantOverview,
  AIAssistantOverviewParams,
  AIAssistantProviderUsageParams,
  AIAssistantProviderUsageResponse,
  AIAssistantUsageTimeseries,
  AIAssistantUsageTimeseriesParams,
  AIAssistantUserUsageListResponse,
  AIAssistantUserUsageParams,
} from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.admin

export async function getAiAssistantOverview(params: AIAssistantOverviewParams = {}): Promise<AIAssistantOverview> {
  const { data } = await apiClient.get<ApiSuccessResponse<AIAssistantOverview>>(endpoints.aiAssistantOverview, {
    params,
  })
  return data.data
}

export async function getAiAssistantProviderUsage(
  params: AIAssistantProviderUsageParams,
): Promise<AIAssistantProviderUsageResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<AIAssistantProviderUsageResponse>>(
    endpoints.aiAssistantProviders,
    { params },
  )
  return data.data
}

export async function getAiAssistantUsageTimeseries(
  params: AIAssistantUsageTimeseriesParams,
): Promise<AIAssistantUsageTimeseries> {
  const { data } = await apiClient.get<ApiSuccessResponse<AIAssistantUsageTimeseries>>(
    endpoints.aiAssistantUsageTimeseries,
    { params },
  )
  return data.data
}

export async function getAiAssistantUserUsage(
  params: AIAssistantUserUsageParams,
): Promise<AIAssistantUserUsageListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<AIAssistantUserUsageListResponse>>(
    endpoints.aiAssistantUsers,
    { params },
  )
  return data.data
}

export async function getAiAssistantLogs(params: AIAssistantLogsParams): Promise<AIAssistantMessageLogListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<AIAssistantMessageLogListResponse>>(endpoints.aiAssistantLogs, {
    params,
  })
  return data.data
}
