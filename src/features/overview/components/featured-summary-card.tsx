import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TrendBadge, type SummaryTrend } from '@/features/overview/components/trend-badge'
import { cn } from '@/lib/utils'

interface FeaturedSummaryCardProps {
  title: string
  icon: LucideIcon
  amount: string
  meta?: string
  trend?: SummaryTrend
  onClick?: () => void
}

/** The mobile hero variant of SummaryCard — used to surface the single most actionable stat above the compact grid. */
export function FeaturedSummaryCard({ title, icon: Icon, amount, meta, trend, onClick }: FeaturedSummaryCardProps) {
  return (
    <Card className="gap-0 border-border/70 p-0 shadow-none">
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        aria-label={title}
        className={cn(
          'flex w-full flex-col gap-2 rounded-xl p-4 text-left active:scale-[0.99]',
          onClick &&
            'cursor-pointer transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
          {trend && <TrendBadge trend={trend} />}
        </div>
        <div className="text-3xl font-bold tabular-nums">{amount}</div>
        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      </button>
    </Card>
  )
}
