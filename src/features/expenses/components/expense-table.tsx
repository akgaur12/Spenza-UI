import { format } from 'date-fns'
import { Receipt } from 'lucide-react'
import { ExpenseActions } from '@/features/expenses/components/expense-actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Expense } from '@/features/expenses/types'
import { formatCurrency, formatExpenseDay, formatExpenseTableDate } from '@/lib/format'
import { cn } from '@/lib/utils'

interface ExpenseTableProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

/** Shades every other calendar month so a long, densely-packed table still reads as distinct
 * months at a glance — toggles whenever the month changes between adjacent (already-sorted) rows. */
function withMonthShading(expenses: Expense[]): { expense: Expense; shaded: boolean }[] {
  let previousMonthKey: string | null = null
  let shaded = false

  return expenses.map((expense) => {
    const monthKey = format(new Date(expense.spent_at), 'yyyy-MM')
    if (monthKey !== previousMonthKey) {
      shaded = !shaded
      previousMonthKey = monthKey
    }
    return { expense, shaded }
  })
}

export function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  const stickyHead = 'sticky top-[168px] z-10 bg-background'
  const rows = withMonthShading(expenses)

  return (
    <Table containerClassName="overflow-visible">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className={cn(stickyHead, 'pr-1')}>Date</TableHead>
          <TableHead className={cn(stickyHead, 'pl-1')}>Day</TableHead>
          <TableHead className={stickyHead}>Category</TableHead>
          <TableHead className={stickyHead}>Description</TableHead>
          <TableHead className={cn(stickyHead, 'pr-6 text-right')}>Amount</TableHead>
          <TableHead className={cn(stickyHead, 'w-0 pl-6')}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ expense, shaded }) => (
          <TableRow key={expense.id} className={cn(shaded && 'bg-border/30 hover:bg-border/70')}>
            <TableCell className="pr-1">{formatExpenseTableDate(expense.spent_at)}</TableCell>
            <TableCell className="pl-1 text-muted-foreground">{formatExpenseDay(expense.spent_at)}</TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                <span aria-hidden>{expense.category.icon ?? <Receipt className="size-4 text-muted-foreground" />}</span>
                {expense.category.name}
              </span>
            </TableCell>
            <TableCell className="max-w-64 truncate whitespace-normal">{expense.description}</TableCell>
            <TableCell className="pr-6 text-right font-medium tabular-nums">{formatCurrency(expense.amount)}</TableCell>
            <TableCell className="pl-6">
              <div className="flex justify-end">
                <ExpenseActions
                  description={expense.description}
                  onEdit={() => onEdit(expense)}
                  onDelete={() => onDelete(expense)}
                  alwaysVisible
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
