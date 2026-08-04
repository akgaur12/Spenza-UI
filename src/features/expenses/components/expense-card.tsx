import { Receipt } from 'lucide-react'
import { ExpenseActions } from '@/features/expenses/components/expense-actions'
import { ExpenseAmount } from '@/features/expenses/components/expense-amount'
import type { Expense } from '@/features/expenses/types'
import { formatExpenseDate } from '@/lib/format'

interface ExpenseCardProps {
  expense: Expense
  /** Shown when the list isn't grouped by date (amount-sorted views) so the date isn't lost. */
  showDate?: boolean
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export function ExpenseCard({ expense, showDate, onEdit, onDelete }: ExpenseCardProps) {
  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border/70 bg-card p-3 shadow-sm">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg"
        aria-hidden
      >
        {expense.category.icon ?? <Receipt className="size-4 text-muted-foreground" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{expense.description}</p>
        <p className="truncate text-xs text-muted-foreground">
          {expense.category.name}
          {showDate ? ` · ${formatExpenseDate(expense.spent_at)}` : ''}
        </p>
      </div>
      <ExpenseAmount amount={expense.amount} className="shrink-0" />
      <ExpenseActions
        description={expense.description}
        onEdit={() => onEdit(expense)}
        onDelete={() => onDelete(expense)}
      />
    </div>
  )
}
