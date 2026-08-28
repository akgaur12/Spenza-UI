import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  getAiAssistantOverview,
  getAiAssistantProviderUsage,
  getAiAssistantUsageTimeseries,
  getAiAssistantUserUsage,
} from '@/features/admin/api/admin-ai-assistant-stats.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type {
  AIAssistantOverviewParams,
  AIAssistantProviderUsageParams,
  AIAssistantUsageTimeseriesParams,
  AIAssistantUserUsageParams,
} from '@/features/admin/types'

export function useAiAssistantOverview(params: AIAssistantOverviewParams = {}) {
  return useQuery({
    queryKey: adminKeys.aiAssistantOverview(params),
    queryFn: () => getAiAssistantOverview(params),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

export function useAiAssistantProviderUsage(params: AIAssistantProviderUsageParams) {
  return useQuery({
    queryKey: adminKeys.aiAssistantProviders(params),
    queryFn: () => getAiAssistantProviderUsage(params),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

export function useAiAssistantUsageTimeseries(params: AIAssistantUsageTimeseriesParams) {
  return useQuery({
    queryKey: adminKeys.aiAssistantUsageTimeseries(params),
    queryFn: () => getAiAssistantUsageTimeseries(params),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

export function useAiAssistantUserUsage(params: AIAssistantUserUsageParams) {
  return useQuery({
    queryKey: adminKeys.aiAssistantUsers(params),
    queryFn: () => getAiAssistantUserUsage(params),
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  })
}
