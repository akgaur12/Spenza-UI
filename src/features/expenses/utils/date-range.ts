import { endOfMonth, endOfWeek, endOfYear, format, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
import type { ExpenseDateRangePreset } from '@/features/expenses/types'

const DATE_FORMAT = 'yyyy-MM-dd'

/** Matches the Reports feature's floor (`MIN_REPORT_YEAR`) so year pickers are consistent app-wide. */
export const MIN_YEAR = 2020

/** Newest first, matching how a year picker is normally scanned. */
export function yearOptions(): number[] {
  const current = new Date().getFullYear()
  const years: number[] = []
  for (let year = current; year >= MIN_YEAR; year--) years.push(year)
  return years
}

export const DATE_RANGE_LABELS: Record<ExpenseDateRangePreset, string> = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  year: 'This Year',
  monthYear: 'Month & Year',
  custom: 'Custom',
}

/** Resolves a preset to a concrete start/end date. Returns null for "custom"/"monthYear" — the caller supplies its own dates. */
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
    case 'monthYear':
    case 'custom':
      return null
  }
}

/** Resolves a specific calendar month (0-indexed) and year to its full start/end date range. */
export function resolveMonthYearRange(month: number, year: number): { startDate: string; endDate: string } {
  const date = new Date(year, month, 1)
  return { startDate: format(startOfMonth(date), DATE_FORMAT), endDate: format(endOfMonth(date), DATE_FORMAT) }
}

/** Resolves a specific calendar year to its full start/end date range. */
export function resolveYearRange(year: number): { startDate: string; endDate: string } {
  const date = new Date(year, 0, 1)
  return { startDate: format(startOfYear(date), DATE_FORMAT), endDate: format(endOfYear(date), DATE_FORMAT) }
}
