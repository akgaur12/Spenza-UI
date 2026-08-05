import type { LucideIcon } from 'lucide-react'

interface AnalyticsCardProps {
  icon: LucideIcon
  label: string
  value: string
  subtitle?: string
}

export function AnalyticsCard({ icon: Icon, label, value, subtitle }: AnalyticsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/70 p-4 transition-colors hover:bg-accent/40">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-lg font-semibold">{value}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}
