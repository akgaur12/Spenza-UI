import { IMPORT_ERROR_LABELS } from '@/features/import-export/utils/error-labels'
import { downloadCsv } from '@/features/import-export/utils/download-file'
import type { ImportPreviewRow } from '@/features/import-export/types'

/** The backend only returns row-level errors in the preview payload, so the report is built from it client-side. */
export function downloadImportErrorReport(fileName: string, rows: ImportPreviewRow[]) {
  const invalidRows = rows.filter((row) => !row.valid)
  const csvRows = [
    ['Row', 'Date', 'Category', 'Description', 'Amount', 'Errors'],
    ...invalidRows.map((row) => [
      String(row.row_number),
      row.date ?? '',
      row.category?.name ?? '',
      row.description ?? '',
      row.amount ?? '',
      row.errors.map((error) => `${error.field}: ${IMPORT_ERROR_LABELS[error.code]} — ${error.message}`).join('; '),
    ]),
  ]
  downloadCsv(csvRows, `import-errors-${fileName.replace(/\.[^.]+$/, '')}.csv`)
}
