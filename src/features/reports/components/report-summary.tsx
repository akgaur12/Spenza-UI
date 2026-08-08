import { differenceInCalendarDays } from 'date-fns'
import type { ReactNode } from 'react'
import type { CategoryAnalyticsResponse } from '@/features/analytics/types'
import { CategoryIcon } from '@/features/categories/components/category-icon'
import type { ResolvedReportRange } from '@/features/reports/types'
import { formatCurrency } from '@/lib/format'

interface ReportSummaryProps {
  data: CategoryAnalyticsResponse
  resolved: ResolvedReportRange
}

/**
 * "Largest Expense" is deliberately not shown here: no existing endpoint returns it for an
 * arbitrary date range (the categories endpoint reused for this summary only aggregates totals
 * per category) — fetching it would mean pulling every expense in the range just to find a max,
 * which the spec explicitly says not to do. It's still in the generated PDF itself.
 */
export function ReportSummary({ data, resolved }: ReportSummaryProps) {
  const spanDays = differenceInCalendarDays(new Date(resolved.endDate), new Date(resolved.startDate)) + 1
  const averageDaily = Number(data.total_spending) / spanDays
  const topCategory = data.categories[0] ?? null

  return (
    <div className="grid grid-cols-2 gap-3">
      <SummaryTile label="Total Spending" value={formatCurrency(data.total_spending)} />
      <SummaryTile label="Expense Count" value={String(data.expense_count)} />
      <SummaryTile label="Avg Daily Spending" value={`${formatCurrency(averageDaily)}/day`} />
      <SummaryTile label="Top Category">
        {topCategory ? (
          <div className="flex min-w-0 items-center gap-1.5">
            <CategoryIcon icon={topCategory.icon} className="text-base" />
            <span className="truncate">{topCategory.name}</span>
          </div>
        ) : (
          '—'
        )}
      </SummaryTile>
    </div>
  )
}

function SummaryTile({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 truncate text-lg font-semibold tabular-nums">{children ?? value}</div>
    </div>
  )
}
