import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReportActions } from '@/features/reports/components/report-actions'
import { ReportPeriodSelector } from '@/features/reports/components/report-period-selector'
import { ReportPreview } from '@/features/reports/components/report-preview'
import { ReportTypeSelector } from '@/features/reports/components/report-type-selector'
import { useReportSummary } from '@/features/reports/hooks/use-report-summary'
import type { ReportPeriod, ReportType } from '@/features/reports/types'
import {
  buildReportRequest,
  currentReportYear,
  resolveReportPeriod,
  validateReportPeriod,
} from '@/features/reports/utils/report-date-range'

function defaultPeriodForType(type: ReportType): ReportPeriod {
  const now = new Date()
  const year = currentReportYear()

  switch (type) {
    case 'monthly':
      return { type: 'monthly', year, month: now.getMonth() + 1 }
    case 'quarterly':
      return { type: 'quarterly', year, quarter: Math.floor(now.getMonth() / 3) + 1 }
    case 'yearly':
      return { type: 'yearly', year }
    case 'custom':
      return { type: 'custom', startDate: null, endDate: null }
  }
}

export function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>(() => defaultPeriodForType('monthly'))

  const resolved = resolveReportPeriod(period)
  const validationError = validateReportPeriod(period)
  const request = buildReportRequest(period)
  const summaryQuery = useReportSummary(resolved)

  const isEmptyPeriod = summaryQuery.data?.expense_count === 0
  const actionsDisabled = Boolean(validationError) || isEmptyPeriod || summaryQuery.isPending

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Reports</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Report Type</p>
              <ReportTypeSelector value={period.type} onChange={(type) => setPeriod(defaultPeriodForType(type))} />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Report Period</p>
              <ReportPeriodSelector period={period} resolved={resolved} onChange={setPeriod} />
              {validationError && <p className="text-sm text-destructive">{validationError}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportPreview period={period} resolved={resolved} summaryQuery={summaryQuery} />
          </CardContent>
        </Card>

        {resolved && <ReportActions request={request} period={period} resolved={resolved} disabled={actionsDisabled} />}
      </div>
    </div>
  )
}
