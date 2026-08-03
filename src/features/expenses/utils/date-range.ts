import { endOfMonth, endOfWeek, endOfYear, format, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
import type { ExpenseDateRangePreset } from '@/features/expenses/types'

const DATE_FORMAT = 'yyyy-MM-dd'

export const DATE_RANGE_LABELS: Record<ExpenseDateRangePreset, string> = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  year: 'This Year',
  custom: 'Custom',
}

/** Resolves a preset to a concrete start/end date. Returns null for "custom" — the caller supplies its own dates. */
export function resolveDateRangePreset(preset: ExpenseDateRangePreset): { startDate: string; endDate: string } | null {
  const now = new Date()
  switch (preset) {
    case 'today':
      return { startDate: format(now, DATE_FORMAT), endDate: format(now, DATE_FORMAT) }
    case 'week':
      return { startDate: format(startOfWeek(now), DATE_FORMAT), endDate: format(endOfWeek(now), DATE_FORMAT) }
    case 'month':
      return { startDate: format(startOfMonth(now), DATE_FORMAT), endDate: format(endOfMonth(now), DATE_FORMAT) }
    case 'year':
      return { startDate: format(startOfYear(now), DATE_FORMAT), endDate: format(endOfYear(now), DATE_FORMAT) }
    case 'custom':
      return null
  }
}
