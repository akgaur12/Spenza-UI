import { PreviewTable } from '@/features/import-export/components/preview-table'
import type { ImportPreviewResponse } from '@/features/import-export/types'

interface PreviewStepProps {
  preview: ImportPreviewResponse
}

export function PreviewStep({ preview }: PreviewStepProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span className="truncate font-medium text-foreground">{preview.file_name}</span>
        <span>
          Showing {Math.min(20, preview.rows.length)} of {preview.total_rows} rows
        </span>
      </div>
      <PreviewTable rows={preview.rows} />
    </div>
  )
}
