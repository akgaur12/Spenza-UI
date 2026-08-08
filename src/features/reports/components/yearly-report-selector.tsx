import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { ResolvedReportRange } from '@/features/reports/types'
import { reportRangeLabel, reportYearOptions } from '@/features/reports/utils/report-date-range'

interface YearlyReportSelectorProps {
  year: number | null
  resolved: ResolvedReportRange | null
  onYearChange: (year: number) => void
}

export function YearlyReportSelector({ year, resolved, onYearChange }: YearlyReportSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        <Label htmlFor="report-year">Year</Label>
        <Select value={year ? String(year) : undefined} onValueChange={(value) => onYearChange(Number(value))}>
          <SelectTrigger id="report-year" className="w-full sm:w-40">
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
      {resolved && <p className="text-sm text-muted-foreground">{reportRangeLabel(resolved)}</p>}
    </div>
  )
}
