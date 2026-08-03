import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ExpenseHeader({ onAddExpense }: { onAddExpense: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>
      <Button onClick={onAddExpense}>
        <Plus />
        Add Expense
      </Button>
    </div>
  )
}
