import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import type { ExpenseDateRange, ExpenseDateRangePreset } from '@/features/expenses/types'
import { DATE_RANGE_LABELS, resolveDateRangePreset } from '@/features/expenses/utils/date-range'
import { cn } from '@/lib/utils'

const PRESETS: ExpenseDateRangePreset[] = ['today', 'week', 'month', 'year']

interface DateRangeFilterProps {
  value: ExpenseDateRange | null
  onChange: (range: ExpenseDateRange | null) => void
  className?: string
}

export function DateRangeFilter({ value, onChange, className }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false)

  const label =
    value?.preset === 'custom' && value.startDate && value.endDate
      ? `${format(new Date(value.startDate), 'd MMM')} – ${format(new Date(value.endDate), 'd MMM')}`
      : value
        ? DATE_RANGE_LABELS[value.preset]
        : 'Date Range'

  function selectPreset(preset: ExpenseDateRangePreset) {
    const resolved = resolveDateRangePreset(preset)
    onChange(resolved ? { preset, ...resolved } : { preset })
    setOpen(false)
  }

  function selectCustomRange(range: DateRange | undefined) {
    if (!range?.from) return
    onChange({
      preset: 'custom',
      startDate: format(range.from, 'yyyy-MM-dd'),
      endDate: format(range.to ?? range.from, 'yyyy-MM-dd'),
    })
    if (range.to) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('justify-start font-normal', value && 'text-foreground', className)}
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{label}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit max-w-[calc(100vw-2rem)] p-3"
        align="center"
        collisionPadding={16}
      >
        <div className="flex flex-col gap-0.5">
          {PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={value?.preset === preset ? 'secondary' : 'ghost'}
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
            value?.preset === 'custom' && value.startDate
              ? { from: new Date(value.startDate), to: value.endDate ? new Date(value.endDate) : undefined }
              : undefined
          }
          onSelect={selectCustomRange}
          numberOfMonths={1}
        />
        {value && (
          <>
            <Separator className="my-2" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                onChange(null)
                setOpen(false)
              }}
            >
              Clear
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
