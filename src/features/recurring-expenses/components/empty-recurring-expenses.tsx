import { Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyRecurringExpenses({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-12 text-center sm:py-20">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Repeat className="size-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">No recurring expenses yet</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Create recurring expenses for rent, subscriptions, bills, and other repeating payments.
        </p>
      </div>
      <Button size="lg" onClick={onCreate}>
        + New Recurring Expense
      </Button>
    </div>
  )
}
