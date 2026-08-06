import { Badge } from '@/components/ui/badge'
import type { ImportHistoryEntry } from '@/features/import-export/types'
import { formatExpenseDate } from '@/lib/format'

interface ImportHistoryProps {
  history: ImportHistoryEntry[]
}

export function ImportHistory({ history }: ImportHistoryProps) {
  if (history.length === 0) {
    return <p className="text-sm text-muted-foreground">No imports yet — your recent imports will show up here.</p>
  }

  return (
    <div className="space-y-2">
      {history.map((entry) => (
        <div key={entry.id} className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium">{entry.fileName}</p>
            <p className="text-xs text-muted-foreground">
              {formatExpenseDate(entry.importedAt)} · {entry.importedCount} {entry.importedCount === 1 ? 'Row' : 'Rows'}
            </p>
          </div>
          <Badge variant={entry.status === 'completed' ? 'secondary' : 'destructive'} className="shrink-0">
            {entry.status === 'completed' ? 'Completed' : 'Failed'}
          </Badge>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Recent imports on this device only.</p>
    </div>
  )
}
