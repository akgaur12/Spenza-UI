import { useMemo, useState } from 'react'
import type {
  GenerationMode,
  RecurringExpenseInfiniteParams,
  RecurringExpenseStatus,
  RecurringFrequency,
} from '@/features/recurring-expenses/types'

export function useRecurringExpenseFilters() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<RecurringExpenseStatus | null>(null)
  const [frequency, setFrequency] = useState<RecurringFrequency | null>(null)
  const [generationMode, setGenerationMode] = useState<GenerationMode | null>(null)
  const [resetKey, setResetKey] = useState(0)

  const params = useMemo<RecurringExpenseInfiniteParams>(
    () => ({
      search: search || undefined,
      status: status ?? undefined,
      frequency: frequency ?? undefined,
      generation_mode: generationMode ?? undefined,
    }),
    [search, status, frequency, generationMode],
  )

  const hasActiveFilters = Boolean(search || status || frequency || generationMode)

  function clearFilters() {
    setSearch('')
    setStatus(null)
    setFrequency(null)
    setGenerationMode(null)
    // Forces RecurringExpenseSearch (which owns its own debounced input state) to remount and drop its stale text.
    setResetKey((key) => key + 1)
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    frequency,
    setFrequency,
    generationMode,
    setGenerationMode,
    resetKey,
    params,
    hasActiveFilters,
    clearFilters,
  }
}
