import { format } from 'date-fns'
import type { ReportPeriod, ReportRequest, ResolvedReportRange } from '@/features/reports/types'

/** Mirrors `src/modules/reports/date_range_resolver.py` on the backend — kept in sync deliberately
 * so period selection can be validated and previewed client-side without a round trip, while the
 * backend remains the source of truth that actually enforces these bounds. The backend itself
 * accepts any year back to 2000; this narrower floor is just a product decision to keep the
 * picker relevant (the backend would still accept an older year if ever sent). */
export const MIN_REPORT_YEAR = 2020
export const MAX_CUSTOM_RANGE_DAYS = 366 * 5

export function currentReportYear(): number {
  return new Date().getFullYear()
}

/** Newest first, matching how a year picker is normally scanned. */
export function reportYearOptions(): number[] {
  const current = currentReportYear()
  const years: number[] = []
  for (let year = current; year >= MIN_REPORT_YEAR; year--) years.push(year)
  return years
}

export const MONTH_OPTIONS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
] as const

export const QUARTER_OPTIONS = [
  { value: 1, label: 'Q1', months: 'Jan – Mar' },
  { value: 2, label: 'Q2', months: 'Apr – Jun' },
  { value: 3, label: 'Q3', months: 'Jul – Sep' },
  { value: 4, label: 'Q4', months: 'Oct – Dec' },
] as const

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

function todayIsoDate(): string {
  const now = new Date()
  return toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

/** Resolves a period's concrete start/end dates once every required field is filled in — `null` while the form is incomplete. */
export function resolveReportPeriod(period: ReportPeriod): ResolvedReportRange | null {
  switch (period.type) {
    case 'monthly': {
      if (!period.year || !period.month) return null
      return {
        startDate: toIsoDate(period.year, period.month, 1),
        endDate: toIsoDate(period.year, period.month, daysInMonth(period.year, period.month)),
      }
    }
    case 'quarterly': {
      if (!period.year || !period.quarter) return null
      const startMonth = (period.quarter - 1) * 3 + 1
      const endMonth = startMonth + 2
      return {
        startDate: toIsoDate(period.year, startMonth, 1),
        endDate: toIsoDate(period.year, endMonth, daysInMonth(period.year, endMonth)),
      }
    }
    case 'yearly': {
      if (!period.year) return null
      return { startDate: toIsoDate(period.year, 1, 1), endDate: toIsoDate(period.year, 12, 31) }
    }
    case 'custom': {
      if (!period.startDate || !period.endDate) return null
      return { startDate: period.startDate, endDate: period.endDate }
    }
  }
}

/** `null` means valid. Mirrors the backend's field-presence and range-bound checks so the Generate
 * button can be disabled before ever making a request. */
export function validateReportPeriod(period: ReportPeriod): string | null {
  const currentYear = currentReportYear()

  if (period.type !== 'custom') {
    if (!period.year) return 'Select a year.'
    if (period.year < MIN_REPORT_YEAR || period.year > currentYear) {
      return `Year must be between ${MIN_REPORT_YEAR} and ${currentYear}.`
    }
  }
  if (period.type === 'monthly' && !period.month) return 'Select a month.'
  if (period.type === 'quarterly' && !period.quarter) return 'Select a quarter.'
  if (period.type === 'custom') {
    if (!period.startDate || !period.endDate) return 'Select a start and end date.'
    if (period.startDate > period.endDate) return 'End date must be on or after the start date.'
  }

  const resolved = resolveReportPeriod(period)
  if (!resolved) return 'Select a period.'

  if (period.type === 'custom') {
    const spanDays =
      Math.round((new Date(resolved.endDate).getTime() - new Date(resolved.startDate).getTime()) / 86_400_000) + 1
    if (spanDays > MAX_CUSTOM_RANGE_DAYS) {
      return `Date range is too large — maximum is about ${Math.floor(MAX_CUSTOM_RANGE_DAYS / 366)} years.`
    }
  }

  if (resolved.startDate > todayIsoDate()) {
    return 'This period is entirely in the future — there is nothing to report on yet.'
  }

  return null
}

export function buildReportRequest(period: ReportPeriod): ReportRequest {
  switch (period.type) {
    case 'monthly':
      return { type: 'monthly', year: period.year ?? undefined, month: period.month ?? undefined }
    case 'quarterly':
      return { type: 'quarterly', year: period.year ?? undefined, quarter: period.quarter ?? undefined }
    case 'yearly':
      return { type: 'yearly', year: period.year ?? undefined }
    case 'custom':
      return { type: 'custom', start_date: period.startDate ?? undefined, end_date: period.endDate ?? undefined }
  }
}

/** "July 2026", "Q3 2026", "2026", or "1 Jan 2026 – 30 Jun 2026" — the headline label for the selected period. */
export function reportPeriodTitle(period: ReportPeriod): string | null {
  switch (period.type) {
    case 'monthly': {
      if (!period.year || !period.month) return null
      return format(new Date(period.year, period.month - 1, 1), 'MMMM yyyy')
    }
    case 'quarterly': {
      if (!period.year || !period.quarter) return null
      return `Q${period.quarter} ${period.year}`
    }
    case 'yearly':
      return period.year ? String(period.year) : null
    case 'custom': {
      const resolved = resolveReportPeriod(period)
      if (!resolved) return null
      return `${format(new Date(resolved.startDate), 'd MMM yyyy')} – ${format(new Date(resolved.endDate), 'd MMM yyyy')}`
    }
  }
}

/** The resolved calendar range as a human string — shown under the headline title for monthly/quarterly/yearly reports. */
export function reportRangeLabel(resolved: ResolvedReportRange): string {
  return `${format(new Date(resolved.startDate), 'MMM d')} – ${format(new Date(resolved.endDate), 'MMM d, yyyy')}`
}

const REPORT_TYPE_LABELS: Record<ReportPeriod['type'], string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
  custom: 'Custom',
}

export function reportTypeLabel(type: ReportPeriod['type']): string {
  return REPORT_TYPE_LABELS[type]
}

/** Used only when the backend response is missing a `Content-Disposition` filename. */
export function fallbackReportFilename(period: ReportPeriod, resolved: ResolvedReportRange): string {
  switch (period.type) {
    case 'monthly':
      return `spenza-monthly-report-${resolved.startDate.slice(0, 7)}.pdf`
    case 'quarterly':
      return `spenza-quarterly-report-${period.year}-Q${period.quarter}.pdf`
    case 'yearly':
      return `spenza-yearly-report-${period.year}.pdf`
    case 'custom':
      return `spenza-custom-report-${resolved.startDate}-to-${resolved.endDate}.pdf`
  }
}
