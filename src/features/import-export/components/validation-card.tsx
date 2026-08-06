import type { ImportPreviewResponse, ImportRowErrorCode } from '@/features/import-export/types'
import { IMPORT_ERROR_LABELS } from '@/features/import-export/utils/error-labels'
import { cn } from '@/lib/utils'

interface ValidationCardProps {
  preview: ImportPreviewResponse
}

export function ValidationCard({ preview }: ValidationCardProps) {
  const errorCounts = new Map<ImportRowErrorCode, number>()
  preview.rows.forEach((row) => {
    row.errors.forEach((error) => {
      errorCounts.set(error.code, (errorCounts.get(error.code) ?? 0) + 1)
    })
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryStat label="Total Rows" value={preview.total_rows} />
        <SummaryStat label="Valid Rows" value={preview.valid_rows} tone="positive" />
        <SummaryStat label="Invalid Rows" value={preview.invalid_rows} tone={preview.invalid_rows > 0 ? 'negative' : undefined} />
      </div>

      {errorCounts.size > 0 && (
        <div className="rounded-lg border p-4">
          <p className="mb-2 text-sm font-medium">Issues found</p>
          <ul className="space-y-1.5 text-sm">
            {[...errorCounts.entries()].map(([code, count]) => (
              <li key={code} className="flex items-center justify-between">
                <span className="text-muted-foreground">{IMPORT_ERROR_LABELS[code]}</span>
                <span className="font-medium tabular-nums">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SummaryStat({ label, value, tone }: { label: string; value: number; tone?: 'positive' | 'negative' }) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <p
        className={cn(
          'text-2xl font-bold tabular-nums',
          tone === 'positive' && 'text-success',
          tone === 'negative' && 'text-destructive',
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
