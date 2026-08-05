import { BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyAnalyticsProps {
  onAddExpense: () => void
}

export function EmptyAnalytics({ onAddExpense }: EmptyAnalyticsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-12 text-center sm:py-20">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <BarChart3 className="size-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">No analytics available yet</h2>
        <p className="max-w-sm text-sm text-muted-foreground">Start adding expenses to unlock insights.</p>
      </div>
      <Button size="lg" onClick={onAddExpense}>
        Add Expense
      </Button>
    </div>
  )
}
