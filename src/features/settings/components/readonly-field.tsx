import type { ReactNode } from 'react'

interface ReadonlyFieldProps {
  label: string
  value: string
  badge?: ReactNode
}

export function ReadonlyField({ label, value, badge }: ReadonlyFieldProps) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground">
        <span className="truncate">{value}</span>
        {badge}
      </div>
    </div>
  )
}
