import { useQuery } from '@tanstack/react-query'
import { getAdminStatsOverview } from '@/features/admin/api/admin-stats.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'

export function useAdminStatsOverview() {
  return useQuery({
    queryKey: adminKeys.statsOverview(),
    queryFn: getAdminStatsOverview,
    staleTime: 60 * 1000,
  })
}
