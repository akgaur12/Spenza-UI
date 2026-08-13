import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TrendBadge, type SummaryTrend } from '@/features/overview/components/trend-badge'
import { cn } from '@/lib/utils'

const TONE_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  destructive: 'bg-destructive/10 text-destructive',
} as const

interface SummaryCardProps {
  title: string
  icon: LucideIcon
  amount: string
  meta?: string
  trend?: SummaryTrend
  tone?: keyof typeof TONE_CLASSES
  onClick?: () => void
}

export function SummaryCard({ title, icon: Icon, amount, meta, trend, tone = 'primary', onClick }: SummaryCardProps) {
  return (
    <Card className="h-full gap-0 border-border/70 p-0 shadow-none transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        aria-label={title}
        className={cn(
          'flex h-full w-full flex-col gap-2.5 rounded-xl p-4 text-left active:scale-[0.98]',
          onClick &&
            'cursor-pointer transition-[transform,colors] hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', TONE_CLASSES[tone])}>
            <Icon className="size-4" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
        </div>
        <div className="text-xl font-semibold tabular-nums sm:text-2xl">{amount}</div>
        {(meta || trend) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 text-xs">
            {trend && <TrendBadge trend={trend} />}
            {meta && <span className="text-muted-foreground">{meta}</span>}
          </div>
        )}
      </button>
    </Card>
  )
}
