import { createFileRoute } from '@tanstack/react-router'
import { RecurringExpensesPage } from '@/features/recurring-expenses/recurring-expenses-page'

export const Route = createFileRoute('/_app/recurring-expenses')({
  component: RecurringExpensesPage,
})
