import type { MonthTrend } from '@/features/dashboard/types'
import { cn } from '@/lib/utils'

export interface SummaryTrend {
  direction: MonthTrend
  label: string
}

const TREND_ARROW: Record<MonthTrend, string> = { up: '↑', down: '↓', same: '' }
const TREND_COLOR: Record<MonthTrend, string> = {
  up: 'text-destructive',
  down: 'text-success',
  same: 'text-muted-foreground',
}

export function TrendBadge({ trend, className }: { trend: SummaryTrend; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-0.5 text-xs font-medium', TREND_COLOR[trend.direction], className)}
    >
      {TREND_ARROW[trend.direction]} {trend.label}
    </span>
  )
}
