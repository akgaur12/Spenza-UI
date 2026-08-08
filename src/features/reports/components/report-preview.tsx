import type { UseQueryResult } from '@tanstack/react-query'
import { SectionError } from '@/components/common/section-error'
import type { CategoryAnalyticsResponse } from '@/features/analytics/types'
import { EmptyReportState } from '@/features/reports/components/empty-report-state'
import { ReportSkeleton } from '@/features/reports/components/report-skeleton'
import { ReportSummary } from '@/features/reports/components/report-summary'
import type { ReportPeriod, ResolvedReportRange } from '@/features/reports/types'
import { reportPeriodTitle, reportRangeLabel } from '@/features/reports/utils/report-date-range'

interface ReportPreviewProps {
  period: ReportPeriod
  resolved: ResolvedReportRange | null
  summaryQuery: UseQueryResult<CategoryAnalyticsResponse>
}

/** The generated PDF is the source of truth — this only ever shows a lightweight, pre-generation
 * summary of the selected period, never a rendering of the PDF itself. */
export function ReportPreview({ period, resolved, summaryQuery }: ReportPreviewProps) {
  const title = reportPeriodTitle(period)

  return (
    <div className="space-y-4">
      {title && (
        <div>
          <p className="text-lg font-semibold">{title}</p>
          {resolved && <p className="text-sm text-muted-foreground">{reportRangeLabel(resolved)}</p>}
        </div>
      )}

      {!resolved ? (
        <p className="text-sm text-muted-foreground">Select a report period to see a summary.</p>
      ) : summaryQuery.isPending ? (
        <ReportSkeleton />
      ) : summaryQuery.isError ? (
        <SectionError message="Unable to load the report summary." onRetry={() => summaryQuery.refetch()} />
      ) : summaryQuery.data.expense_count === 0 ? (
        <EmptyReportState />
      ) : (
        <ReportSummary data={summaryQuery.data} resolved={resolved} />
      )}
    </div>
  )
}
