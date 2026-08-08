import type { RecurringExpenseInfiniteParams } from '@/features/recurring-expenses/types'

export const recurringExpensesKeys = {
  all: ['recurring-expenses'] as const,
  infinite: (params: RecurringExpenseInfiniteParams) => [...recurringExpensesKeys.all, 'infinite', params] as const,
}
