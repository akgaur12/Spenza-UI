import { format } from 'date-fns'
import type { Expense, ExpenseSortOption } from '@/features/expenses/types'
import { formatExpenseGroupHeading } from '@/lib/format'

export interface ExpenseDateGroup {
  dateKey: string
  heading: string
  total: number
  items: Expense[]
}

/** Sort is applied client-side over whatever has loaded so far — the backend has no sort param, only a fixed newest-first order. */
export function sortExpenses(expenses: Expense[], sort: ExpenseSortOption): Expense[] {
  const sorted = [...expenses]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.spent_at).getTime() - new Date(b.spent_at).getTime())
    case 'highest':
      return sorted.sort((a, b) => Number(b.amount) - Number(a.amount))
    case 'lowest':
      return sorted.sort((a, b) => Number(a.amount) - Number(b.amount))
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.spent_at).getTime() - new Date(a.spent_at).getTime())
  }
}

export function groupExpensesByDate(expenses: Expense[]): ExpenseDateGroup[] {
  const groups: ExpenseDateGroup[] = []
  const indexByKey = new Map<string, number>()

  for (const expense of expenses) {
    const dateKey = format(new Date(expense.spent_at), 'yyyy-MM-dd')
    const existingIndex = indexByKey.get(dateKey)

    if (existingIndex === undefined) {
      indexByKey.set(dateKey, groups.length)
      groups.push({
        dateKey,
        heading: formatExpenseGroupHeading(expense.spent_at),
        total: Number(expense.amount),
        items: [expense],
      })
    } else {
      const group = groups[existingIndex]
      group.total += Number(expense.amount)
      group.items.push(expense)
    }
  }

  return groups
}
