import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { createExpense, deleteExpense, updateExpense } from '@/features/expenses/api/expenses.api'
import type { Expense, ExpenseCreateRequest, ExpenseListResponse, ExpenseUpdateRequest } from '@/features/expenses/types'
import { getErrorMessage } from '@/lib/errors'
import { expensesKeys } from './query-keys'

type ExpensesPage = InfiniteData<ExpenseListResponse>

/** Applies `updater` to every cached infinite expense-list query (across all active filter/sort combinations), returning a snapshot for rollback. */
function patchInfiniteExpenseQueries(queryClient: QueryClient, updater: (data: ExpensesPage) => ExpensesPage) {
  const snapshot = new Map<QueryKey, ExpensesPage | undefined>()
  const matches = queryClient.getQueriesData<ExpensesPage>({
    queryKey: expensesKeys.all,
    predicate: (query) => query.queryKey[1] === 'infinite',
  })

  for (const [key, data] of matches) {
    snapshot.set(key, data)
    if (data) queryClient.setQueryData(key, updater(data))
  }

  return snapshot
}

function restoreInfiniteExpenseQueries(queryClient: QueryClient, snapshot: Map<QueryKey, ExpensesPage | undefined>) {
  snapshot.forEach((data, key) => queryClient.setQueryData(key, data))
}

/** Every mutation touches totals shown elsewhere (Overview summary, recent expenses, analytics) — settle by invalidating those instead of hand-patching their shapes. */
function invalidateExpenseDependents(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: expensesKeys.all })
  queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
  queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
}

interface CategoryPreview {
  name: string
  icon: string | null
}

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { payload: ExpenseCreateRequest; categoryPreview: CategoryPreview }) =>
      createExpense(variables.payload),
    onMutate: async ({ payload, categoryPreview }) => {
      await queryClient.cancelQueries({ queryKey: expensesKeys.all })

      const optimisticExpense: Expense = {
        id: `optimistic-${crypto.randomUUID()}`,
        description: payload.description,
        amount: payload.amount,
        spent_at: payload.spent_at,
        category: { id: payload.category_id, name: categoryPreview.name, icon: categoryPreview.icon },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const snapshot = patchInfiniteExpenseQueries(queryClient, (data) => ({
        ...data,
        pages: data.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                items: [optimisticExpense, ...page.items],
                total: page.total + 1,
              }
            : page,
        ),
      }))

      return { snapshot }
    },
    onSuccess: () => {
      toast.success('Expense added')
    },
    onError: (error, _variables, context) => {
      if (context) restoreInfiniteExpenseQueries(queryClient, context.snapshot)
      toast.error('Could not add expense', { description: getErrorMessage(error) })
    },
    onSettled: () => invalidateExpenseDependents(queryClient),
  })
}

export function useUpdateExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { expenseId: string; payload: ExpenseUpdateRequest }) =>
      updateExpense(variables.expenseId, variables.payload),
    onMutate: async ({ expenseId, payload }) => {
      await queryClient.cancelQueries({ queryKey: expensesKeys.all })

      const snapshot = patchInfiniteExpenseQueries(queryClient, (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.map((item) =>
            item.id === expenseId
              ? {
                  ...item,
                  description: payload.description ?? item.description,
                  amount: payload.amount ?? item.amount,
                  spent_at: payload.spent_at ?? item.spent_at,
                }
              : item,
          ),
        })),
      }))

      return { snapshot }
    },
    onSuccess: () => {
      toast.success('Expense updated')
    },
    onError: (error, _variables, context) => {
      if (context) restoreInfiniteExpenseQueries(queryClient, context.snapshot)
      toast.error('Could not update expense', { description: getErrorMessage(error) })
    },
    onSettled: () => invalidateExpenseDependents(queryClient),
  })
}

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (expenseId: string) => deleteExpense(expenseId),
    onMutate: async (expenseId) => {
      await queryClient.cancelQueries({ queryKey: expensesKeys.all })

      const snapshot = patchInfiniteExpenseQueries(queryClient, (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.filter((item) => item.id !== expenseId),
          total: Math.max(0, page.total - 1),
        })),
      }))

      return { snapshot }
    },
    onSuccess: () => {
      toast.success('Expense deleted')
    },
    onError: (error, _variables, context) => {
      if (context) restoreInfiniteExpenseQueries(queryClient, context.snapshot)
      toast.error('Could not delete expense', { description: getErrorMessage(error) })
    },
    onSettled: () => invalidateExpenseDependents(queryClient),
  })
}
