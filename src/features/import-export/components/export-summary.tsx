import type { ExportDateRange, ExportFormat } from '@/features/import-export/types'
import { EXPORT_DATE_RANGE_LABELS } from '@/features/import-export/utils/export-date-range'
import { formatExpenseTableDate } from '@/lib/format'

interface ExportSummaryProps {
  count: number | undefined
  isLoading: boolean
  dateRange: ExportDateRange
  format: ExportFormat
}

export function ExportSummary({ count, isLoading, dateRange, format }: ExportSummaryProps) {
  const rangeLabel =
    dateRange.preset === 'custom' && dateRange.startDate && dateRange.endDate
      ? `${formatExpenseTableDate(dateRange.startDate)} – ${formatExpenseTableDate(dateRange.endDate)}`
      : EXPORT_DATE_RANGE_LABELS[dateRange.preset]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <SummaryItem label="Expenses" value={isLoading ? '—' : String(count ?? 0)} />
      <SummaryItem label="Date Range" value={rangeLabel} />
      <SummaryItem label="Format" value={format.toUpperCase()} />
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-lg font-semibold">{value}</p>
    </div>
  )
}
