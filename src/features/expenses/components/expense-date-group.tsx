import { ExpenseCard } from '@/features/expenses/components/expense-card'
import type { Expense } from '@/features/expenses/types'
import type { ExpenseDateGroup as ExpenseDateGroupData } from '@/features/expenses/utils/group-expenses'
import { formatCurrency } from '@/lib/format'

interface ExpenseDateGroupProps {
  group: ExpenseDateGroupData
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export function ExpenseDateGroup({ group, onEdit, onDelete }: ExpenseDateGroupProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between px-4 py-2 text-sm">
        <span className="font-semibold">{group.heading}</span>
        <span className="text-muted-foreground">{formatCurrency(group.total)}</span>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {group.items.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
