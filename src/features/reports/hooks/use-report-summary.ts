import { useQuery } from '@tanstack/react-query'
import { getCategoryAnalytics } from '@/features/analytics/api/analytics.api'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import type { ResolvedReportRange } from '@/features/reports/types'

/**
 * Reuses the existing category-analytics endpoint (and its query cache) rather than adding a
 * report-specific summary endpoint — `total_spending`, `expense_count`, and `categories[0]` (top
 * category) cover everything the pre-generation summary needs. Disabled until a period fully
 * resolves, so an incomplete form never fires a request.
 */
export function useReportSummary(resolved: ResolvedReportRange | null) {
  const params = { start_date: resolved?.startDate, end_date: resolved?.endDate }
  return useQuery({
    queryKey: analyticsKeys.categories(params),
    queryFn: () => getCategoryAnalytics(params),
    enabled: resolved !== null,
    staleTime: 60 * 1000,
  })
}
