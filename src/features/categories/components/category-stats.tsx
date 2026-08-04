import { formatCurrency } from '@/lib/format'

export function CategoryStats({ expenseCount, total }: { expenseCount: number; total: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-muted-foreground">
        {expenseCount} {expenseCount === 1 ? 'Expense' : 'Expenses'}
      </span>
      <span className="text-sm font-semibold tabular-nums">{formatCurrency(total)}</span>
    </div>
  )
}
