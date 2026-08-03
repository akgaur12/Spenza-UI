import { useQuery } from '@tanstack/react-query'
import { getCategoryAnalytics } from '@/features/analytics/api/analytics.api'
import type { CategoryAnalyticsParams } from '@/features/analytics/types'
import { analyticsKeys } from './query-keys'

export function useCategoryAnalytics(params: CategoryAnalyticsParams = {}) {
  return useQuery({
    queryKey: analyticsKeys.categories(params),
    queryFn: () => getCategoryAnalytics(params),
    staleTime: 60 * 1000,
  })
}
