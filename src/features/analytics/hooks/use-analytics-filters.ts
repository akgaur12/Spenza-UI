import { useMemo, useState } from 'react'
import type { AnalyticsDateRange, AnalyticsDateRangePreset } from '@/features/analytics/types'
import { resolveDateRangePreset } from '@/features/analytics/utils/date-range'

const DEFAULT_PRESET: AnalyticsDateRangePreset = 'month'

function defaultDateRange(): AnalyticsDateRange {
  const resolved = resolveDateRangePreset(DEFAULT_PRESET)
  return { preset: DEFAULT_PRESET, ...resolved! }
}

export function useAnalyticsFilters() {
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>(defaultDateRange)

  function setPreset(preset: AnalyticsDateRangePreset) {
    const resolved = resolveDateRangePreset(preset)
    if (resolved) setDateRange({ preset, ...resolved })
  }

  function setCustomRange(startDate: string, endDate: string) {
    setDateRange({ preset: 'custom', startDate, endDate })
  }

  function reset() {
    setDateRange(defaultDateRange())
  }

  const isDefault = dateRange.preset === DEFAULT_PRESET

  const params = useMemo(
    () => ({ start_date: dateRange.startDate, end_date: dateRange.endDate }),
    [dateRange.startDate, dateRange.endDate],
  )

  return { dateRange, setPreset, setCustomRange, reset, isDefault, params }
}

export type AnalyticsFiltersState = ReturnType<typeof useAnalyticsFilters>
