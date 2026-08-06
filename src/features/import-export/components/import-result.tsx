import { Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ImportConfirmResult } from '@/features/import-export/hooks/use-import-confirm-mutation'

interface ImportResultProps {
  result: ImportConfirmResult
  onImportAnother: () => void
}

export function ImportResult({ result, onImportAnother }: ImportResultProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="size-7 text-success" />
      </div>
      <div>
        <p className="text-lg font-semibold">Import Completed</p>
        <p className="text-sm text-muted-foreground">
          {result.imported_count} {result.imported_count === 1 ? 'Expense' : 'Expenses'} Imported
          {result.failed_count > 0 && (
            <>
              {' · '}
              {result.failed_count} {result.failed_count === 1 ? 'Row' : 'Rows'} Skipped
            </>
          )}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Completed in {formatDuration(result.durationMs)}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link to="/expenses">View Expenses</Link>
        </Button>
        <Button type="button" variant="outline" onClick={onImportAnother}>
          Import Another File
        </Button>
      </div>
    </div>
  )
}

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
}
