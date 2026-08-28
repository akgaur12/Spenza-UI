const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
})

/** Backend cost figures are Decimal strings (e.g. "0.0234") or null when a provider has no pricing configured. */
export function formatUsd(value: string | null): string {
  if (value === null) return '—'
  const parsed = Number(value)
  return Number.isFinite(parsed) ? usdFormatter.format(parsed) : '—'
}
