import { format } from 'date-fns'
import { useCategoryAnalytics } from '@/features/analytics/hooks/use-category-analytics'
import { useCategories } from '@/features/categories/hooks/use-categories'
import type { CategoryListParams, CategoryWithStats } from '@/features/categories/types'

/** Well before any account could exist — combined with today, this approximates an "all time" range for the analytics endpoint, which otherwise defaults to the current calendar month. */
const ALL_TIME_START = '2000-01-01'

export function useCategoriesWithStats(params: CategoryListParams = {}) {
  const categoriesQuery = useCategories(params)
  const analyticsQuery = useCategoryAnalytics({ start_date: ALL_TIME_START, end_date: format(new Date(), 'yyyy-MM-dd') })

  const statsByCategoryId = new Map(
    (analyticsQuery.data?.categories ?? []).map((item) => [item.category_id, item]),
  )

  const items: CategoryWithStats[] = (categoriesQuery.data?.items ?? []).map((category) => {
    const stats = statsByCategoryId.get(category.id)
    return { ...category, expense_count: stats?.expense_count ?? 0, total: stats?.total ?? '0' }
  })

  return {
    items,
    isPending: categoriesQuery.isPending || analyticsQuery.isPending,
    isError: categoriesQuery.isError || analyticsQuery.isError,
    refetch: () => {
      categoriesQuery.refetch()
      analyticsQuery.refetch()
    },
  }
}
