import { createFileRoute } from '@tanstack/react-router'
import { RecurringExpensesPage } from '@/features/recurring-expenses/recurring-expenses-page'

/** Lets other pages (e.g. Overview's Quick Actions) deep-link straight into the create-recurring-expense form. */
export interface RecurringExpensesSearch {
  create?: true
}

export const Route = createFileRoute('/_app/recurring-expenses')({
  validateSearch: (search: Record<string, unknown>): RecurringExpensesSearch => ({
    create: search.create === true || search.create === 'true' ? true : undefined,
  }),
  component: RecurringExpensesPage,
})
