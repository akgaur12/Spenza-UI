import { useQuery } from '@tanstack/react-query'
import { getTrendAnalytics } from '@/features/analytics/api/analytics.api'
import type { TrendAnalyticsParams } from '@/features/analytics/types'
import { analyticsKeys } from './query-keys'

export function useTrendAnalytics(params: TrendAnalyticsParams) {
  return useQuery({
    queryKey: analyticsKeys.trends(params),
    queryFn: () => getTrendAnalytics(params),
    staleTime: 60 * 1000,
  })
}
