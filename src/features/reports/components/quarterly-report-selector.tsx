import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ResolvedReportRange } from '@/features/reports/types'
import { QUARTER_OPTIONS, reportRangeLabel, reportYearOptions } from '@/features/reports/utils/report-date-range'

interface QuarterlyReportSelectorProps {
  year: number | null
  quarter: number | null
  resolved: ResolvedReportRange | null
  onYearChange: (year: number) => void
  onQuarterChange: (quarter: number) => void
}

export function QuarterlyReportSelector({
  year,
  quarter,
  resolved,
  onYearChange,
  onQuarterChange,
}: QuarterlyReportSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="report-year">Year</Label>
          <Select value={year ? String(year) : undefined} onValueChange={(value) => onYearChange(Number(value))}>
            <SelectTrigger id="report-year" className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {reportYearOptions().map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="report-quarter">Quarter</Label>
          <Select
            value={quarter ? String(quarter) : undefined}
            onValueChange={(value) => onQuarterChange(Number(value))}
          >
            <SelectTrigger id="report-quarter" className="w-full">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              {QUARTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label} ({option.months})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {resolved && <p className="text-sm text-muted-foreground">{reportRangeLabel(resolved)}</p>}
    </div>
  )
}
