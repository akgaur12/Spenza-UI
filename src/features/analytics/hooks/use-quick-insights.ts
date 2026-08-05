import { format } from 'date-fns'
import { useCategoryAnalytics } from '@/features/analytics/hooks/use-category-analytics'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import type { CategoryAnalyticsItem } from '@/features/analytics/types'

export interface QuickInsightsData {
  highestSpendingMonth: { period: string; total: number } | null
  highestSpendingWeek: { period: string; total: number } | null
  mostExpensiveCategory: CategoryAnalyticsItem | null
  averageExpense: number
  activeCategoryCount: number
  zeroSpendingDays: number
}

interface UseQuickInsightsParams {
  start_date: string
  end_date: string
}

function maxByTotal(points: { period: string; total: string }[]): { period: string; total: number } | null {
  return points.reduce<{ period: string; total: number } | null>((best, point) => {
    const total = Number(point.total)
    if (total <= 0) return best
    if (!best || total > best.total) return { period: point.period, total }
    return best
  }, null)
}

export function useQuickInsights({ start_date, end_date }: UseQuickInsightsParams) {
  const monthlyQuery = useTrendAnalytics({ interval: 'monthly', start_date, end_date })
  const weeklyQuery = useTrendAnalytics({ interval: 'weekly', start_date, end_date })
  // Same queryKey as Analytics Summary's daily query for this range — shares its cache entry, no extra request.
  const dailyQuery = useTrendAnalytics({ interval: 'daily', start_date, end_date })
  const categoryQuery = useCategoryAnalytics({ start_date, end_date })

  const isPending = monthlyQuery.isPending || weeklyQuery.isPending || dailyQuery.isPending || categoryQuery.isPending
  const isError = monthlyQuery.isError || weeklyQuery.isError || dailyQuery.isError || categoryQuery.isError

  function refetch() {
    monthlyQuery.refetch()
    weeklyQuery.refetch()
    dailyQuery.refetch()
    categoryQuery.refetch()
  }

  if (isPending || isError) {
    return { isPending, isError, refetch, data: undefined as QuickInsightsData | undefined }
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  const zeroSpendingDays = dailyQuery.data.data.filter(
    (point) => point.period <= today && Number(point.total) === 0,
  ).length

  const data: QuickInsightsData = {
    highestSpendingMonth: maxByTotal(monthlyQuery.data.data),
    highestSpendingWeek: maxByTotal(weeklyQuery.data.data),
    mostExpensiveCategory: categoryQuery.data.categories[0] ?? null,
    averageExpense: categoryQuery.data.expense_count
      ? Number(categoryQuery.data.total_spending) / categoryQuery.data.expense_count
      : 0,
    activeCategoryCount: categoryQuery.data.categories.length,
    zeroSpendingDays,
  }

  return { isPending: false, isError: false, refetch, data }
}
