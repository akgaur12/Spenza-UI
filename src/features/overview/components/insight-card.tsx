import type { LucideIcon } from 'lucide-react'

interface InsightCardProps {
  icon: LucideIcon
  label: string
  value: string
  meta?: string
}

export function InsightCard({ icon: Icon, label, value, meta }: InsightCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/70 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
        {meta && <p className="truncate text-xs text-muted-foreground">{meta}</p>}
      </div>
    </div>
  )
}
