import { useQuery } from '@tanstack/react-query'
import { getDashboardSummary } from '@/features/dashboard/api/dashboard.api'
import { dashboardKeys } from './query-keys'

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
    staleTime: 60 * 1000,
  })
}
