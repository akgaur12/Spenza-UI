import type { ExpenseListParams } from '@/features/expenses/types'

export const expensesKeys = {
  all: ['expenses'] as const,
  list: (params: ExpenseListParams) => [...expensesKeys.all, 'list', params] as const,
}
