import { useQuery } from '@tanstack/react-query'
import { listExpenses } from '@/features/expenses/api/expenses.api'
import type { Expense } from '@/features/expenses/types'

/** The expenses endpoint has no server-side sort — this pages through matching expenses (capped) and
 * picks the largest client-side. A personal expense tracker's per-range volume makes this cap generous. */
const PAGE_SIZE = 100
const MAX_PAGES = 10

interface LargestExpenseParams {
  start_date: string
  end_date: string
  category_id: string | null
}

async function findLargestExpense({ start_date, end_date, category_id }: LargestExpenseParams): Promise<Expense | null> {
  let largest: Expense | null = null
  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await listExpenses({
      start_date,
      end_date,
      category_id: category_id ? [category_id] : undefined,
      page,
      page_size: PAGE_SIZE,
    })
    response.items.forEach((expense) => {
      if (!largest || Number(expense.amount) > Number(largest.amount)) largest = expense
    })
    if (page >= response.total_pages) break
  }
  return largest
}

export function useLargestExpense(params: LargestExpenseParams) {
  return useQuery({
    queryKey: ['analytics', 'largest-expense', params],
    queryFn: () => findLargestExpense(params),
    staleTime: 60 * 1000,
  })
}
