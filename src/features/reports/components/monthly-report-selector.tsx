import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MONTH_OPTIONS, reportYearOptions } from '@/features/reports/utils/report-date-range'

interface MonthlyReportSelectorProps {
  year: number | null
  month: number | null
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
}

export function MonthlyReportSelector({ year, month, onYearChange, onMonthChange }: MonthlyReportSelectorProps) {
  return (
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
        <Label htmlFor="report-month">Month</Label>
        <Select value={month ? String(month) : undefined} onValueChange={(value) => onMonthChange(Number(value))}>
          <SelectTrigger id="report-month" className="w-full">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
