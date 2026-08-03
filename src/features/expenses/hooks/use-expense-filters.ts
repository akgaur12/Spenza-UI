import { useMemo, useState } from 'react'
import type { ExpenseDateRange, ExpenseInfiniteParams, ExpenseSortOption } from '@/features/expenses/types'

export function useExpenseFilters() {
  const [search, setSearch] = useState('')
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<ExpenseDateRange | null>(null)
  const [sort, setSort] = useState<ExpenseSortOption>('newest')
  const [resetKey, setResetKey] = useState(0)

  const params = useMemo<ExpenseInfiniteParams>(
    () => ({
      search: search || undefined,
      category_id: categoryIds.length ? categoryIds : undefined,
      start_date: dateRange?.startDate,
      end_date: dateRange?.endDate,
    }),
    [search, categoryIds, dateRange],
  )

  const hasActiveFilters = Boolean(search || categoryIds.length || dateRange)

  function clearFilters() {
    setSearch('')
    setCategoryIds([])
    setDateRange(null)
    setSort('newest')
    // Forces ExpenseSearch (which owns its own debounced input state) to remount and drop its stale text.
    setResetKey((key) => key + 1)
  }

  return {
    search,
    setSearch,
    categoryIds,
    setCategoryIds,
    dateRange,
    setDateRange,
    sort,
    setSort,
    resetKey,
    params,
    hasActiveFilters,
    clearFilters,
  }
}
