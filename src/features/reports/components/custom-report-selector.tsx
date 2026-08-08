import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { Matcher } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateFieldProps {
  id: string
  label: string
  value: string | null
  onChange: (date: string) => void
  disabled: Matcher | Matcher[]
}

function DateField({ id, label, value, onChange, disabled }: DateFieldProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} type="button" variant="outline" className="w-full justify-start font-normal">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {value ? format(new Date(value), 'd MMM yyyy') : `Select ${label.toLowerCase()}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) onChange(format(date, 'yyyy-MM-dd'))
              setOpen(false)
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface CustomReportSelectorProps {
  startDate: string | null
  endDate: string | null
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export function CustomReportSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: CustomReportSelectorProps) {
  const today = new Date()

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DateField
        id="report-start-date"
        label="Start Date"
        value={startDate}
        onChange={onStartDateChange}
        disabled={{ after: today }}
      />
      <DateField
        id="report-end-date"
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
        disabled={startDate ? [{ after: today }, { before: new Date(startDate) }] : { after: today }}
      />
    </div>
  )
}
