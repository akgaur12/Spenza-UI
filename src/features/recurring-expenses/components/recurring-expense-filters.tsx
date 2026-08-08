import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { GenerationMode, RecurringExpenseStatus, RecurringFrequency } from '@/features/recurring-expenses/types'
import {
  FREQUENCY_OPTIONS,
  GENERATION_MODE_OPTIONS,
  STATUS_OPTIONS,
  frequencyLabel,
  statusLabel,
} from '@/features/recurring-expenses/utils/labels'

const ALL_VALUE = 'all'

/** Short trigger text so the filter row fits on one line on mobile — the dropdown list still shows the full label. */
const GENERATION_MODE_SHORT_LABELS: Record<GenerationMode, string> = {
  auto: 'Auto',
  reminder: 'Reminder',
}

interface RecurringExpenseFiltersProps {
  status: RecurringExpenseStatus | null
  onStatusChange: (status: RecurringExpenseStatus | null) => void
  frequency: RecurringFrequency | null
  onFrequencyChange: (frequency: RecurringFrequency | null) => void
  generationMode: GenerationMode | null
  onGenerationModeChange: (mode: GenerationMode | null) => void
}

export function RecurringExpenseFilters({
  status,
  onStatusChange,
  frequency,
  onFrequencyChange,
  generationMode,
  onGenerationModeChange,
}: RecurringExpenseFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <Select
        value={status ?? ALL_VALUE}
        onValueChange={(value) => onStatusChange(value === ALL_VALUE ? null : (value as RecurringExpenseStatus))}
      >
        <SelectTrigger className="min-w-28 shrink-0 sm:min-w-36">
          <SelectValue>{status ? statusLabel(status) : 'Status'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Statuses</SelectItem>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={frequency ?? ALL_VALUE}
        onValueChange={(value) => onFrequencyChange(value === ALL_VALUE ? null : (value as RecurringFrequency))}
      >
        <SelectTrigger className="min-w-28 shrink-0 sm:min-w-36">
          <SelectValue>{frequency ? frequencyLabel(frequency) : 'Frequency'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Frequencies</SelectItem>
          {FREQUENCY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={generationMode ?? ALL_VALUE}
        onValueChange={(value) => onGenerationModeChange(value === ALL_VALUE ? null : (value as GenerationMode))}
      >
        <SelectTrigger className="min-w-24 shrink-0 sm:min-w-36">
          <SelectValue>{generationMode ? GENERATION_MODE_SHORT_LABELS[generationMode] : 'Mode'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Generation Modes</SelectItem>
          {GENERATION_MODE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
