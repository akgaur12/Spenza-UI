import { endOfMonth, endOfYear, format, startOfMonth, startOfYear } from 'date-fns'
import type { TrendDataPoint, TrendInterval } from '@/features/analytics/types'

/** Maps a trend bucket back to a concrete date range — used for click-through navigation into Expenses. */
export function trendPointToDateRange(interval: TrendInterval, point: TrendDataPoint): { start_date: string; end_date: string } {
  switch (interval) {
    case 'daily':
      return { start_date: point.period, end_date: point.period }
    case 'weekly':
      return { start_date: point.start_date ?? point.period, end_date: point.end_date ?? point.period }
    case 'monthly': {
      const monthStart = new Date(`${point.period}-01`)
      return { start_date: format(startOfMonth(monthStart), 'yyyy-MM-dd'), end_date: format(endOfMonth(monthStart), 'yyyy-MM-dd') }
    }
    case 'yearly': {
      const yearStart = new Date(Number(point.period), 0, 1)
      return { start_date: format(startOfYear(yearStart), 'yyyy-MM-dd'), end_date: format(endOfYear(yearStart), 'yyyy-MM-dd') }
    }
  }
}

export function trendPointLabel(interval: TrendInterval, point: TrendDataPoint): string {
  switch (interval) {
    case 'daily':
      return format(new Date(point.period), 'd MMM')
    case 'weekly':
      return point.start_date ? format(new Date(point.start_date), 'd MMM') : point.period
    case 'monthly':
      return format(new Date(`${point.period}-01`), 'MMM yy')
    case 'yearly':
      return point.period
  }
}
