import type { GenerationMode, RecurringExpenseStatus, RecurringFrequency } from '@/features/recurring-expenses/types'

export const FREQUENCY_OPTIONS: { value: RecurringFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
]

const FREQUENCY_LABELS: Record<RecurringFrequency, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
}

/** "/ month", "/ quarter" — the per-occurrence suffix shown next to an amount on a card. */
const FREQUENCY_SUFFIXES: Record<RecurringFrequency, string> = {
  daily: '/ day',
  weekly: '/ week',
  monthly: '/ month',
  quarterly: '/ quarter',
  yearly: '/ year',
}

export function frequencyLabel(frequency: RecurringFrequency): string {
  return FREQUENCY_LABELS[frequency]
}

export function frequencySuffix(frequency: RecurringFrequency): string {
  return FREQUENCY_SUFFIXES[frequency]
}

export const GENERATION_MODE_OPTIONS: { value: GenerationMode; label: string }[] = [
  { value: 'auto', label: 'Auto Create' },
  { value: 'reminder', label: 'Reminder Only' },
]

const GENERATION_MODE_LABELS: Record<GenerationMode, string> = {
  auto: 'Auto Create',
  reminder: 'Reminder Only',
}

export function generationModeLabel(mode: GenerationMode): string {
  return GENERATION_MODE_LABELS[mode]
}

export const GENERATION_MODE_DESCRIPTIONS: Record<GenerationMode, string> = {
  auto: 'The system automatically creates an expense when the recurring expense is due.',
  reminder: 'The system reminds you when it is due but does not automatically create an expense.',
}

export const STATUS_OPTIONS: { value: RecurringExpenseStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_LABELS: Record<RecurringExpenseStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export function statusLabel(status: RecurringExpenseStatus): string {
  return STATUS_LABELS[status]
}
