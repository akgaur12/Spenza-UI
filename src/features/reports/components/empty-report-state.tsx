import { FileWarning } from 'lucide-react'

export function EmptyReportState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-10 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <FileWarning className="size-5" />
      </div>
      <p className="text-sm font-medium">No expenses found for this period.</p>
      <p className="text-sm text-muted-foreground">Try selecting another period or add an expense first.</p>
    </div>
  )
}
