import type { ExpenseInfiniteParams, ExpenseListParams } from '@/features/expenses/types'

export const expensesKeys = {
  all: ['expenses'] as const,
  list: (params: ExpenseListParams) => [...expensesKeys.all, 'list', params] as const,
  infinite: (params: ExpenseInfiniteParams) => [...expensesKeys.all, 'infinite', params] as const,
}
