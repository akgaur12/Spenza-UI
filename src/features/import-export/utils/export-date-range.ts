import { endOfMonth, endOfYear, format, startOfMonth, startOfYear, subYears } from 'date-fns'
import type { ExportDateRangePreset } from '@/features/import-export/types'

const DATE_FORMAT = 'yyyy-MM-dd'

export const EXPORT_DATE_RANGE_LABELS: Record<ExportDateRangePreset, string> = {
  month: 'This Month',
  year: 'This Year',
  last_year: 'Last Year',
  all: 'All Data',
  custom: 'Custom Range',
}

/** Resolves a preset to a concrete start/end date. "all" clears both (no filter). Returns null for "custom" — the caller supplies its own dates. */
export function resolveExportDateRangePreset(
  preset: ExportDateRangePreset,
): { startDate?: string; endDate?: string } | null {
  const now = new Date()
  switch (preset) {
    case 'month':
      return { startDate: format(startOfMonth(now), DATE_FORMAT), endDate: format(endOfMonth(now), DATE_FORMAT) }
    case 'year':
      return { startDate: format(startOfYear(now), DATE_FORMAT), endDate: format(endOfYear(now), DATE_FORMAT) }
    case 'last_year': {
      const lastYear = subYears(now, 1)
      return { startDate: format(startOfYear(lastYear), DATE_FORMAT), endDate: format(endOfYear(lastYear), DATE_FORMAT) }
    }
    case 'all':
      return { startDate: undefined, endDate: undefined }
    case 'custom':
      return null
  }
}
