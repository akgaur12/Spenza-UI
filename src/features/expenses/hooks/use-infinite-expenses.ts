import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { listExpenses } from '@/features/expenses/api/expenses.api'
import type { ExpenseInfiniteParams } from '@/features/expenses/types'
import { expensesKeys } from './query-keys'

export const EXPENSES_PAGE_SIZE = 20

export function useInfiniteExpenses(params: ExpenseInfiniteParams) {
  return useInfiniteQuery({
    queryKey: expensesKeys.infinite(params),
    queryFn: ({ pageParam }) => listExpenses({ ...params, page: pageParam, page_size: EXPENSES_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
    staleTime: 30 * 1000,
    // Keeps the previous filter's results on screen (dimmed) instead of flashing back to a skeleton on every filter/search change.
    placeholderData: keepPreviousData,
  })
}
