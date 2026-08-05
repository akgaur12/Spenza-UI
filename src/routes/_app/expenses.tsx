import { createFileRoute } from '@tanstack/react-router'
import { ExpensesPage } from '@/features/expenses/expenses-page'

/** Lets other pages (e.g. Analytics charts) deep-link into a pre-filtered expense list. */
export interface ExpensesSearch {
  category_id?: string
  start_date?: string
  end_date?: string
}

export const Route = createFileRoute('/_app/expenses')({
  validateSearch: (search: Record<string, unknown>): ExpensesSearch => ({
    category_id: typeof search.category_id === 'string' ? search.category_id : undefined,
    start_date: typeof search.start_date === 'string' ? search.start_date : undefined,
    end_date: typeof search.end_date === 'string' ? search.end_date : undefined,
  }),
  component: ExpensesPage,
})
