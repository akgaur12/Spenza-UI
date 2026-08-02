import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DashboardStat {
  label: string
  value: string
  icon: LucideIcon
  trend?: { value: string; direction: 'up' | 'down' }
}

export function DashboardPreviewCard({ label, value, icon: Icon, trend }: DashboardStat) {
  return (
    <Card className="border-border/70 shadow-none">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <span className="flex size-8 items-center justify-center rounded-md bg-accent">
            <Icon className="size-4 text-accent-foreground" />
          </span>
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {trend && (
          <p
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend.direction === 'up' ? 'text-destructive' : 'text-success',
            )}
          >
            {trend.direction === 'up' ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
