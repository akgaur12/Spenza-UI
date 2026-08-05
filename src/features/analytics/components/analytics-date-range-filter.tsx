import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import type { AnalyticsDateRange, AnalyticsDateRangePreset } from '@/features/analytics/types'
import { DATE_RANGE_LABELS } from '@/features/analytics/utils/date-range'
import { cn } from '@/lib/utils'

const PRESETS: AnalyticsDateRangePreset[] = ['today', 'last7days', 'last30days']

interface AnalyticsDateRangeFilterProps {
  value: AnalyticsDateRange
  onPresetChange: (preset: AnalyticsDateRangePreset) => void
  onCustomRangeChange: (startDate: string, endDate: string) => void
  className?: string
}

export function AnalyticsDateRangeFilter({
  value,
  onPresetChange,
  onCustomRangeChange,
  className,
}: AnalyticsDateRangeFilterProps) {
  const [open, setOpen] = useState(false)

  // "This Month" and "This Year" live as their own buttons now — this trigger shows a neutral
  // placeholder whenever one of those is the active preset, rather than mirroring their label.
  const isOwnPreset = PRESETS.includes(value.preset) || value.preset === 'custom'
  const label = !isOwnPreset
    ? 'Date Range'
    : value.preset === 'custom'
      ? `${format(new Date(value.startDate), 'd MMM')} – ${format(new Date(value.endDate), 'd MMM')}`
      : DATE_RANGE_LABELS[value.preset]

  function selectPreset(preset: AnalyticsDateRangePreset) {
    onPresetChange(preset)
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
