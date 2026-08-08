import { CategoryIcon } from '@/features/categories/components/category-icon'
import { GenerationModeBadge } from '@/features/recurring-expenses/components/generation-mode-badge'
import { RecurringExpenseActions } from '@/features/recurring-expenses/components/recurring-expense-actions'
import { RecurringExpenseStatusBadge } from '@/features/recurring-expenses/components/recurring-expense-status-badge'
import type { RecurringExpense } from '@/features/recurring-expenses/types'
import { frequencySuffix } from '@/features/recurring-expenses/utils/labels'
import { formatCurrency, formatExpenseTableDate } from '@/lib/format'

interface RecurringExpenseCardProps {
  recurringExpense: RecurringExpense
  onEdit: (recurringExpense: RecurringExpense) => void
  onPause: (recurringExpense: RecurringExpense) => void
  onResume: (recurringExpense: RecurringExpense) => void
  onRunNow: (recurringExpense: RecurringExpense) => void
  onDelete: (recurringExpense: RecurringExpense) => void
}

export function RecurringExpenseCard({
  recurringExpense,
  onEdit,
  onPause,
  onResume,
  onRunNow,
  onDelete,
}: RecurringExpenseCardProps) {
  const r = recurringExpense

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <CategoryIcon icon={r.category.icon} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{r.description}</p>
          <p className="text-lg font-semibold tabular-nums">
            {formatCurrency(r.amount)}{' '}
            <span className="text-xs font-normal text-muted-foreground">{frequencySuffix(r.frequency)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="truncate text-xs text-muted-foreground">{r.category.name}</span>
        <GenerationModeBadge mode={r.generation_mode} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Next Run</p>
          <p className="font-medium">{formatExpenseTableDate(r.next_run_date)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Last Run</p>
          <p className="font-medium">{r.last_run_date ? formatExpenseTableDate(r.last_run_date) : '—'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 pt-3">
        <RecurringExpenseStatusBadge status={r.status} />
        <RecurringExpenseActions
          recurringExpense={r}
          onEdit={() => onEdit(r)}
          onPause={() => onPause(r)}
          onResume={() => onResume(r)}
          onRunNow={() => onRunNow(r)}
          onDelete={() => onDelete(r)}
        />
      </div>
    </div>
  )
}
