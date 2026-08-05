import { endOfYear, format, startOfMonth, startOfYear, subDays } from 'date-fns'
import type { AnalyticsDateRangePreset } from '@/features/analytics/types'

const DATE_FORMAT = 'yyyy-MM-dd'

export const DATE_RANGE_LABELS: Record<AnalyticsDateRangePreset, string> = {
  today: 'Today',
  last7days: 'Last 7 Days',
  month: 'This Month',
  last30days: 'Last 30 Days',
  year: 'This Year',
  custom: 'Custom Range',
}

/** Resolves a preset to a concrete start/end date. Returns null for "custom" — the caller supplies its own dates. */
export function resolveDateRangePreset(preset: AnalyticsDateRangePreset): { startDate: string; endDate: string } | null {
  const now = new Date()
  switch (preset) {
    case 'today':
      return { startDate: format(now, DATE_FORMAT), endDate: format(now, DATE_FORMAT) }
    case 'last7days':
      return { startDate: format(subDays(now, 6), DATE_FORMAT), endDate: format(now, DATE_FORMAT) }
    case 'month':
      return { startDate: format(startOfMonth(now), DATE_FORMAT), endDate: format(now, DATE_FORMAT) }
    case 'last30days':
      return { startDate: format(subDays(now, 29), DATE_FORMAT), endDate: format(now, DATE_FORMAT) }
    case 'year':
      return { startDate: format(startOfYear(now), DATE_FORMAT), endDate: format(endOfYear(now), DATE_FORMAT) }
    case 'custom':
      return null
  }
}
