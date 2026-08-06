import { downloadCsv } from '@/features/import-export/utils/download-file'

/**
 * No backend endpoint serves a sample template, so this ships a small bundled one instead —
 * matches the columns and date format (`DD-Mon-YYYY`) the import preview endpoint expects.
 */
export function downloadSampleTemplate() {
  downloadCsv(
    [
      ['Date', 'Category', 'Description', 'Amount'],
      ['15-Jan-2026', 'Food', 'Lunch with team', '450'],
      ['16-Jan-2026', 'Transport', 'Cab to airport', '850'],
    ],
    'spenza-import-template.csv',
  )
}
