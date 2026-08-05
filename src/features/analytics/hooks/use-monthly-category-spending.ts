import { useQueries } from '@tanstack/react-query'
import { addMonths, endOfMonth, format, max, min, startOfMonth } from 'date-fns'
import { getCategoryAnalytics } from '@/features/analytics/api/analytics.api'
import type { CategoryAnalyticsResponse } from '@/features/analytics/types'
import { analyticsKeys } from './query-keys'

/** No backend endpoint returns category spend broken down per month — this composes it from one
 * /analytics/categories call per month in range, capped so a multi-year filter doesn't fan out unbounded. */
const MAX_MONTHS = 12

export const MONTHLY_CATEGORY_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]
const OTHER_COLOR = 'var(--muted-foreground)'
const MAX_SERIES = MONTHLY_CATEGORY_COLORS.length

export interface MonthlyCategorySeries {
  key: string
  name: string
  color: string
}

export interface MonthlyCategoryPoint {
  month: string
  start_date: string
  end_date: string
  [seriesKey: string]: string | number
}

interface MonthlyCategorySpendingResult {
  isPending: boolean
  isError: boolean
  refetch: () => void
  series: MonthlyCategorySeries[]
  data: MonthlyCategoryPoint[]
  truncatedMonths: boolean
}

function monthsInRange(startDate: string, endDate: string): { start: Date; end: Date; label: string }[] {
  const rangeStart = startOfMonth(new Date(startDate))
  const rangeEnd = startOfMonth(new Date(endDate))
  const months: { start: Date; end: Date; label: string }[] = []
  for (let cursor = rangeStart; cursor <= rangeEnd; cursor = addMonths(cursor, 1)) {
    months.push({ start: cursor, end: endOfMonth(cursor), label: format(cursor, 'MMM yyyy') })
  }
  return months
}

export function useMonthlyCategorySpending(
  startDate: string,
  endDate: string,
  categoryIds: string[],
): MonthlyCategorySpendingResult {
  const allMonths = monthsInRange(startDate, endDate)
  const truncatedMonths = allMonths.length > MAX_MONTHS
  const months = truncatedMonths ? allMonths.slice(-MAX_MONTHS) : allMonths
  const overallStart = new Date(startDate)
  const overallEnd = new Date(endDate)

  const queries = useQueries({
    queries: months.map((month) => {
      const params = {
        start_date: format(max([month.start, overallStart]), 'yyyy-MM-dd'),
        end_date: format(min([month.end, overallEnd]), 'yyyy-MM-dd'),
      }
      return {
        queryKey: analyticsKeys.categories(params),
        queryFn: () => getCategoryAnalytics(params),
        staleTime: 60 * 1000,
      }
    }),
  })

  const isPending = queries.some((query) => query.isPending)
  const isError = queries.some((query) => query.isError)

  function refetch() {
    queries.forEach((query) => query.refetch())
  }

  if (isPending || isError) {
    return { isPending, isError, refetch, series: [], data: [], truncatedMonths }
  }

  const responses = queries.map((query) => query.data as CategoryAnalyticsResponse)

  const overallTotals = new Map<string, { name: string; total: number }>()
  responses.forEach((response) => {
    response.categories.forEach((category) => {
      const existing = overallTotals.get(category.category_id)
      const total = Number(category.total)
      if (existing) existing.total += total
      else overallTotals.set(category.category_id, { name: category.name, total })
    })
  })

  const hasSelection = categoryIds.length > 0
  const rankedCategoryIds = hasSelection
    ? categoryIds
    : [...overallTotals.entries()].sort((a, b) => b[1].total - a[1].total).map(([id]) => id)

  // An explicit selection shows every chosen category as its own series — the top-5-then-"Other"
  // grouping only applies to the unfiltered, auto-ranked view.
  const topCategoryIds = hasSelection ? rankedCategoryIds : rankedCategoryIds.slice(0, MAX_SERIES)
  const hasOther = !hasSelection && rankedCategoryIds.length > MAX_SERIES

  const series: MonthlyCategorySeries[] = topCategoryIds.map((id, index) => ({
    key: id,
    name: overallTotals.get(id)?.name ?? 'Unknown',
    color: MONTHLY_CATEGORY_COLORS[index % MONTHLY_CATEGORY_COLORS.length],
  }))
  if (hasOther) series.push({ key: 'other', name: 'Other', color: OTHER_COLOR })

  const data: MonthlyCategoryPoint[] = months.map((month, index) => {
    const response = responses[index]
    const point: MonthlyCategoryPoint = {
      month: month.label,
      start_date: format(max([month.start, overallStart]), 'yyyy-MM-dd'),
      end_date: format(min([month.end, overallEnd]), 'yyyy-MM-dd'),
    }
    let otherTotal = 0
    response.categories.forEach((category) => {
      if (hasSelection && !categoryIds.includes(category.category_id)) return
      if (topCategoryIds.includes(category.category_id)) {
        point[category.category_id] = Number(category.total)
      } else {
        otherTotal += Number(category.total)
      }
    })
    if (hasOther) point.other = otherTotal
    return point
  })

  return { isPending: false, isError: false, refetch, series, data, truncatedMonths }
}
