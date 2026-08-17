import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { AnalyticsDateRange, AnalyticsDateRangePreset } from '@/features/analytics/types'
import { DATE_RANGE_LABELS, yearOptions } from '@/features/analytics/utils/date-range'
import { cn } from '@/lib/utils'

const PRESETS: AnalyticsDateRangePreset[] = ['today', 'last7days', 'last30days']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const YEARS = yearOptions()

/** -1 represents "Whole Year" in the month select — no specific month narrows the range. */
const WHOLE_YEAR = -1

interface AnalyticsDateRangeFilterProps {
  value: AnalyticsDateRange
  onPresetChange: (preset: AnalyticsDateRangePreset) => void
  onMonthYearChange: (month: number, year: number) => void
  onYearChange: (year: number) => void
  onCustomRangeChange: (startDate: string, endDate: string) => void
  className?: string
}

export function AnalyticsDateRangeFilter({
  value,
  onPresetChange,
  onMonthYearChange,
  onYearChange,
  onCustomRangeChange,
  className,
}: AnalyticsDateRangeFilterProps) {
  const [open, setOpen] = useState(false)
  const now = new Date()
  const [pickerMonth, setPickerMonth] = useState(() => {
    if (value.preset === 'year') return WHOLE_YEAR
    if (value.preset === 'monthYear') return new Date(value.startDate).getMonth()
    return now.getMonth()
  })
  const [pickerYear, setPickerYear] = useState(() =>
    value.preset === 'monthYear' || value.preset === 'year' ? new Date(value.startDate).getFullYear() : now.getFullYear(),
  )

  // "This Month" lives as its own external button — this trigger shows a neutral placeholder
  // whenever that preset is active, rather than mirroring its label.
  const isOwnPreset = value.preset !== 'month'
  const label =
    value.preset === 'custom'
      ? `${format(new Date(value.startDate), 'd MMM')} – ${format(new Date(value.endDate), 'd MMM')}`
      : value.preset === 'monthYear'
        ? format(new Date(value.startDate), 'MMMM yyyy')
        : value.preset === 'year'
          ? format(new Date(value.startDate), 'yyyy')
          : isOwnPreset
            ? DATE_RANGE_LABELS[value.preset]
            : 'Date Range'

  function selectPreset(preset: AnalyticsDateRangePreset) {
    onPresetChange(preset)
    setOpen(false)
  }

  function applyPicker(month: number, year: number) {
    if (month === WHOLE_YEAR) {
      onYearChange(year)
    } else {
      onMonthYearChange(month, year)
    }
    setOpen(false)
  }

  function selectCustomRange(range: DateRange | undefined) {
    if (!range?.from) return
    onCustomRangeChange(format(range.from, 'yyyy-MM-dd'), format(range.to ?? range.from, 'yyyy-MM-dd'))
    if (range.to) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isOwnPreset ? 'secondary' : 'outline'}
          className={cn('justify-start font-normal', !isOwnPreset && 'text-muted-foreground', className)}
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{label}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-[calc(100vw-2rem)] p-3" align="start" collisionPadding={16}>
        <div className="flex flex-col gap-0.5">
          {PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={value.preset === preset ? 'secondary' : 'ghost'}
              size="sm"
              className="justify-start"
              onClick={() => selectPreset(preset)}
            >
              {DATE_RANGE_LABELS[preset]}
            </Button>
          ))}
        </div>
        <Separator className="my-2" />
        <div className="flex items-center gap-2">
          <Select
            value={String(pickerMonth)}
            onValueChange={(monthValue) => {
              const month = Number(monthValue)
              setPickerMonth(month)
              applyPicker(month, pickerYear)
            }}
          >
            <SelectTrigger size="sm" className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(WHOLE_YEAR)}>Whole Year</SelectItem>
              {MONTH_NAMES.map((name, index) => (
                <SelectItem key={name} value={String(index)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(pickerYear)}
            onValueChange={(yearValue) => {
              const year = Number(yearValue)
              setPickerYear(year)
              applyPicker(pickerMonth, year)
            }}
          >
            <SelectTrigger size="sm" className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-2" />
        <Calendar
          mode="range"
          selected={
            value.preset === 'custom'
              ? { from: new Date(value.startDate), to: new Date(value.endDate) }
              : undefined
          }
          onSelect={selectCustomRange}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  )
}
