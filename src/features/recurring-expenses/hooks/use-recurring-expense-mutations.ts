import type { QueryClient } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { expensesKeys } from '@/features/expenses/hooks/query-keys'
import {
  createRecurringExpense,
  deleteRecurringExpense,
  pauseRecurringExpense,
  resumeRecurringExpense,
  runRecurringExpenseNow,
  updateRecurringExpense,
} from '@/features/recurring-expenses/api/recurring-expenses.api'
import type { RecurringExpenseCreateRequest, RecurringExpenseUpdateRequest } from '@/features/recurring-expenses/types'
import { getErrorMessage } from '@/lib/errors'
import { recurringExpensesKeys } from './query-keys'

function invalidateRecurringExpenses(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: recurringExpensesKeys.all })
}

/** Run Now creates a real Expense, so everywhere that reflects actual spending needs to catch up too. */
function invalidateGeneratedExpenseDependents(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: expensesKeys.all })
  queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
  queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
}

export function useCreateRecurringExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RecurringExpenseCreateRequest) => createRecurringExpense(payload),
    onSuccess: () => {
      toast.success('Recurring expense created successfully.')
      invalidateRecurringExpenses(queryClient)
    },
    onError: (error) => {
      toast.error('Could not create recurring expense', { description: getErrorMessage(error) })
    },
  })
}

export function useUpdateRecurringExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { recurringExpenseId: string; payload: RecurringExpenseUpdateRequest }) =>
      updateRecurringExpense(variables.recurringExpenseId, variables.payload),
    onSuccess: () => {
      toast.success('Recurring expense updated')
      invalidateRecurringExpenses(queryClient)
    },
    onError: (error) => {
      toast.error('Could not update recurring expense', { description: getErrorMessage(error) })
    },
  })
}

export function useDeleteRecurringExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recurringExpenseId: string) => deleteRecurringExpense(recurringExpenseId),
    onSuccess: () => {
      toast.success('Recurring expense deleted')
      invalidateRecurringExpenses(queryClient)
    },
    onError: (error) => {
      toast.error('Could not delete recurring expense', { description: getErrorMessage(error) })
    },
  })
}

export function usePauseRecurringExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recurringExpenseId: string) => pauseRecurringExpense(recurringExpenseId),
    onSuccess: () => {
      toast.success('Recurring expense paused')
      invalidateRecurringExpenses(queryClient)
    },
    onError: (error) => {
      toast.error('Could not pause recurring expense', { description: getErrorMessage(error) })
    },
  })
}

export function useResumeRecurringExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recurringExpenseId: string) => resumeRecurringExpense(recurringExpenseId),
    onSuccess: () => {
      toast.success('Recurring expense resumed')
      invalidateRecurringExpenses(queryClient)
    },
    onError: (error) => {
      toast.error('Could not resume recurring expense', { description: getErrorMessage(error) })
    },
  })
}

export function useRunRecurringExpenseNowMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recurringExpenseId: string) => runRecurringExpenseNow(recurringExpenseId),
    onSuccess: () => {
      toast.success('Expense created successfully.')
      invalidateRecurringExpenses(queryClient)
      invalidateGeneratedExpenseDependents(queryClient)
    },
    onError: (error) => {
      toast.error('Could not run recurring expense', { description: getErrorMessage(error) })
    },
  })
}
