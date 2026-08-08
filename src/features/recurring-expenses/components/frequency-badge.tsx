import { Badge } from '@/components/ui/badge'
import type { RecurringFrequency } from '@/features/recurring-expenses/types'
import { frequencyLabel } from '@/features/recurring-expenses/utils/labels'

interface FrequencyBadgeProps {
  frequency: RecurringFrequency
  className?: string
}

export function FrequencyBadge({ frequency, className }: FrequencyBadgeProps) {
  return (
    <Badge variant="outline" className={className}>
      {frequencyLabel(frequency)}
    </Badge>
  )
}
