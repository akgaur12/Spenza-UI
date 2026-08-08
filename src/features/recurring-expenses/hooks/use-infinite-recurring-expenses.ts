import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { listRecurringExpenses } from '@/features/recurring-expenses/api/recurring-expenses.api'
import type { RecurringExpenseInfiniteParams } from '@/features/recurring-expenses/types'
import { recurringExpensesKeys } from './query-keys'

export const RECURRING_EXPENSES_PAGE_SIZE = 20

export function useInfiniteRecurringExpenses(params: RecurringExpenseInfiniteParams) {
  return useInfiniteQuery({
    queryKey: recurringExpensesKeys.infinite(params),
    queryFn: ({ pageParam }) =>
      listRecurringExpenses({ ...params, page: pageParam, page_size: RECURRING_EXPENSES_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
    staleTime: 30 * 1000,
    // Keeps the previous filter's results on screen (dimmed) instead of flashing back to a skeleton on every filter/search change.
    placeholderData: keepPreviousData,
  })
}
