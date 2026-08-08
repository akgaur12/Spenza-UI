import { CustomReportSelector } from '@/features/reports/components/custom-report-selector'
import { MonthlyReportSelector } from '@/features/reports/components/monthly-report-selector'
import { QuarterlyReportSelector } from '@/features/reports/components/quarterly-report-selector'
import { YearlyReportSelector } from '@/features/reports/components/yearly-report-selector'
import type { ReportPeriod, ResolvedReportRange } from '@/features/reports/types'

interface ReportPeriodSelectorProps {
  period: ReportPeriod
  resolved: ResolvedReportRange | null
  onChange: (period: ReportPeriod) => void
}

/** Only ever renders the sub-selector matching the currently selected report type. */
export function ReportPeriodSelector({ period, resolved, onChange }: ReportPeriodSelectorProps) {
  switch (period.type) {
    case 'monthly':
      return (
        <MonthlyReportSelector
          year={period.year}
          month={period.month}
          onYearChange={(year) => onChange({ ...period, year })}
          onMonthChange={(month) => onChange({ ...period, month })}
        />
      )
    case 'quarterly':
      return (
        <QuarterlyReportSelector
          year={period.year}
          quarter={period.quarter}
          resolved={resolved}
          onYearChange={(year) => onChange({ ...period, year })}
          onQuarterChange={(quarter) => onChange({ ...period, quarter })}
        />
      )
    case 'yearly':
      return (
        <YearlyReportSelector
          year={period.year}
          resolved={resolved}
          onYearChange={(year) => onChange({ ...period, year })}
        />
      )
    case 'custom':
      return (
        <CustomReportSelector
          startDate={period.startDate}
          endDate={period.endDate}
          onStartDateChange={(startDate) => onChange({ ...period, startDate })}
          onEndDateChange={(endDate) => onChange({ ...period, endDate })}
        />
      )
  }
}
