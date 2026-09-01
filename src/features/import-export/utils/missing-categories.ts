import type { ImportPreviewRow } from '@/features/import-export/types'

const MISSING_CATEGORY_PATTERN = /Category '(.+)' was not found/

/** The backend never returns a dedicated "attempted name" field for a CATEGORY_NOT_FOUND row — it's embedded in the error message. */
export function extractMissingCategoryNames(rows: ImportPreviewRow[]): string[] {
  const names = new Set<string>()
  for (const row of rows) {
    for (const error of row.errors) {
      if (error.code !== 'CATEGORY_NOT_FOUND') continue
      const match = error.message.match(MISSING_CATEGORY_PATTERN)
      if (match) names.add(match[1])
    }
  }
  return [...names]
}
