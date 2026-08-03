import { format, isThisYear, isToday, isYesterday } from 'date-fns'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** Backend amounts are Decimal strings (e.g. "278.00") — always parse through this. */
export function formatCurrency(amount: string | number): string {
  const value = typeof amount === 'string' ? Number(amount) : amount
  return currencyFormatter.format(Number.isFinite(value) ? value : 0)
}

/** "Today" / "Yesterday" / "12 Jul" / "12 Jul 2024" — mirrors how finance apps label recent activity. */
export function formatExpenseDate(isoDateTime: string): string {
  const date = new Date(isoDateTime)
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(date, isThisYear(date) ? 'd MMM' : 'd MMM yyyy')
}

/** "Today (Mon)" / "Yesterday (Sun)" / "Wed, 01 Jan 2025" — used as the timeline's date-group heading. */
export function formatExpenseGroupHeading(isoDateTime: string): string {
  const date = new Date(isoDateTime)
  if (isToday(date)) return `Today (${format(date, 'EEE')})`
  if (isYesterday(date)) return `Yesterday (${format(date, 'EEE')})`
  return format(date, 'EEE, dd MMM yyyy')
}
