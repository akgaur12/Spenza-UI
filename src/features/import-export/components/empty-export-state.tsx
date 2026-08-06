import { Inbox } from 'lucide-react'

export function EmptyExportState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-accent">
        <Inbox className="size-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No expenses to export</p>
        <p className="text-sm text-muted-foreground">You don't have any expenses to export yet.</p>
      </div>
    </div>
  )
}
