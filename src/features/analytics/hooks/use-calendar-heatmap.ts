import { useQuery } from '@tanstack/react-query'
import { getCalendarHeatmap } from '@/features/analytics/api/analytics.api'
import type { CalendarHeatmapParams } from '@/features/analytics/types'
import { analyticsKeys } from './query-keys'

export function useCalendarHeatmap(params: CalendarHeatmapParams = {}) {
  return useQuery({
    queryKey: analyticsKeys.calendarHeatmap(params),
    queryFn: () => getCalendarHeatmap(params),
    staleTime: 60 * 1000,
  })
}
