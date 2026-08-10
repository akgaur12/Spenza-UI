import { PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'

export function EmptyOverview() {
  const { openAddExpenseModal } = useAddExpenseModal()

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-12 text-center sm:py-20">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <PartyPopper className="size-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Welcome to Spenza 👋</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          You haven't added any expenses yet. Start tracking your spending today.
        </p>
      </div>
      <Button size="lg" onClick={openAddExpenseModal}>
        Add First Expense
      </Button>
    </div>
  )
}
