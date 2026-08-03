import { useQuery } from '@tanstack/react-query'
import { listExpenses } from '@/features/expenses/api/expenses.api'
import type { ExpenseListParams } from '@/features/expenses/types'
import { expensesKeys } from './query-keys'

export function useExpenses(params: ExpenseListParams = {}) {
  return useQuery({
    queryKey: expensesKeys.list(params),
    queryFn: () => listExpenses(params),
    staleTime: 30 * 1000,
  })
}
