import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export function ExpenseAmount({ amount, className }: { amount: string; className?: string }) {
  return <span className={cn('text-base font-bold tabular-nums', className)}>{formatCurrency(amount)}</span>
}
