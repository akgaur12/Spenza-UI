import { FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ValidationCard } from '@/features/import-export/components/validation-card'
import type { ImportPreviewResponse } from '@/features/import-export/types'
import { downloadImportErrorReport } from '@/features/import-export/utils/error-report'

interface ValidationStepProps {
  preview: ImportPreviewResponse
  onImport: () => void
  onChooseDifferentFile: () => void
}

export function ValidationStep({ preview, onImport, onChooseDifferentFile }: ValidationStepProps) {
  const canImport = preview.valid_rows > 0

  return (
    <div className="space-y-4">
      <ValidationCard preview={preview} />

      {!canImport && (
        <p className="text-sm text-destructive">No valid rows to import — fix the issues above and upload the file again.</p>
      )}

      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={onChooseDifferentFile}>
            Choose a Different File
          </Button>
          {preview.invalid_rows > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadImportErrorReport(preview.file_name, preview.rows)}
            >
              <FileDown />
              Download Error Report
            </Button>
          )}
        </div>
        <Button type="button" onClick={onImport} disabled={!canImport}>
          Import {preview.valid_rows} {preview.valid_rows === 1 ? 'Row' : 'Rows'}
        </Button>
      </div>
    </div>
  )
}
