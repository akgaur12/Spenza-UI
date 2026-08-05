import { useCategoryAnalytics } from '@/features/analytics/hooks/use-category-analytics'
import { useLargestExpense } from '@/features/analytics/hooks/use-largest-expense'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import type { CategoryAnalyticsItem } from '@/features/analytics/types'

export interface AnalyticsSummaryData {
  averageDailySpending: number
  highestSpendingDay: { date: string; total: number } | null
  largestExpense: { description: string; amount: string; date: string } | null
  mostUsedCategory: CategoryAnalyticsItem | null
}

interface UseAnalyticsSummaryParams {
  start_date: string
  end_date: string
}

export function useAnalyticsSummary({ start_date, end_date }: UseAnalyticsSummaryParams) {
  const trendQuery = useTrendAnalytics({ interval: 'daily', start_date, end_date })
  const categoryQuery = useCategoryAnalytics({ start_date, end_date })
  const largestExpenseQuery = useLargestExpense({ start_date, end_date, category_id: null })

  const isPending = trendQuery.isPending || categoryQuery.isPending || largestExpenseQuery.isPending
  const isError = trendQuery.isError || categoryQuery.isError || largestExpenseQuery.isError

  function refetch() {
    trendQuery.refetch()
    categoryQuery.refetch()
    largestExpenseQuery.refetch()
  }

  if (isPending || isError) {
    return { isPending, isError, refetch, data: undefined as AnalyticsSummaryData | undefined }
  }

  const dailyPoints = trendQuery.data.data
  const averageDailySpending = dailyPoints.length ? Number(trendQuery.data.total_spending) / dailyPoints.length : 0

  const highestDay = dailyPoints.reduce<{ date: string; total: number } | null>((best, point) => {
    const total = Number(point.total)
    if (!best || total > best.total) return { date: point.period, total }
    return best
  }, null)

  const mostUsedCategory = categoryQuery.data.categories.reduce<CategoryAnalyticsItem | null>((best, category) => {
    if (!best || category.expense_count > best.expense_count) return category
    return best
  }, null)

  const largestExpense = largestExpenseQuery.data
  const data: AnalyticsSummaryData = {
    averageDailySpending,
    highestSpendingDay: highestDay && highestDay.total > 0 ? highestDay : null,
    largestExpense: largestExpense
      ? { description: largestExpense.description, amount: largestExpense.amount, date: largestExpense.spent_at }
      : null,
    mostUsedCategory,
  }

  return { isPending: false, isError: false, refetch, data }
}
