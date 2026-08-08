import type { VariantProps } from 'class-variance-authority'
import { Badge, type badgeVariants } from '@/components/ui/badge'
import type { RecurringExpenseStatus } from '@/features/recurring-expenses/types'
import { statusLabel } from '@/features/recurring-expenses/utils/labels'

const STATUS_VARIANTS: Record<RecurringExpenseStatus, VariantProps<typeof badgeVariants>['variant']> = {
  active: 'default',
  paused: 'secondary',
  completed: 'outline',
  cancelled: 'destructive',
}

interface RecurringExpenseStatusBadgeProps {
  status: RecurringExpenseStatus
  className?: string
}

export function RecurringExpenseStatusBadge({ status, className }: RecurringExpenseStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANTS[status]} className={className}>
      {statusLabel(status)}
    </Badge>
  )
}
