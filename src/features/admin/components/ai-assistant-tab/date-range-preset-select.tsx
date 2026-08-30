import { format, subDays } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type DateRangePreset = 'today' | '7' | '30' | '90' | 'all'

export interface DateRangeParams {
  start_date?: string
  end_date?: string
}

export function presetToDateRange(preset: DateRangePreset): DateRangeParams {
  if (preset === 'all') return {}
  if (preset === 'today') {
    const today = format(new Date(), 'yyyy-MM-dd')
    return { start_date: today, end_date: today }
  }
  const days = Number(preset)
  return {
    start_date: format(subDays(new Date(), days - 1), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
  }
}

interface DateRangePresetSelectProps {
  value: DateRangePreset
  onChange: (value: DateRangePreset) => void
}

export function DateRangePresetSelect({ value, onChange }: DateRangePresetSelectProps) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as DateRangePreset)}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
        <SelectItem value="all">All time</SelectItem>
      </SelectContent>
    </Select>
  )
}
