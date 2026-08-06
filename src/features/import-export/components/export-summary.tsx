import type { CategoryListItem } from '@/features/categories/types'
import type { ExportDateRange, ExportFormat } from '@/features/import-export/types'
import { EXPORT_DATE_RANGE_LABELS } from '@/features/import-export/utils/export-date-range'
import { formatExpenseTableDate } from '@/lib/format'
import { cn } from '@/lib/utils'

interface ExportSummaryProps {
  count: number | undefined
  isLoading: boolean
  dateRange: ExportDateRange
  format: ExportFormat
  categoryIds: string[]
  categories: CategoryListItem[]
}

export function ExportSummary({ count, isLoading, dateRange, format, categoryIds, categories }: ExportSummaryProps) {
  const rangeLabel =
    dateRange.preset === 'custom' && dateRange.startDate && dateRange.endDate
      ? `${formatExpenseTableDate(dateRange.startDate)} – ${formatExpenseTableDate(dateRange.endDate)}`
      : EXPORT_DATE_RANGE_LABELS[dateRange.preset]

  const categoryLabel =
    categoryIds.length === 0
      ? 'All Categories'
      : categories
          .filter((category) => categoryIds.includes(category.id))
          .map((category) => category.name)
          .join(', ')

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryItem label="Expenses" value={isLoading ? '—' : String(count ?? 0)} large />
      <SummaryItem label="Date Range" value={rangeLabel} />
      <SummaryItem label="Categories" value={categoryLabel} wrap />
      <SummaryItem label="Format" value={format.toUpperCase()} />
    </div>
  )
}

function SummaryItem({
  label,
  value,
  wrap,
  large,
}: {
  label: string
  value: string
  wrap?: boolean
  large?: boolean
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          'mt-1 font-medium',
          large ? 'text-lg' : 'text-base',
          wrap ? 'break-words' : 'truncate',
        )}
      >
        {value}
      </p>
    </div>
  )
}
