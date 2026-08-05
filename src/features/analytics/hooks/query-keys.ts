import type { CalendarHeatmapParams, CategoryAnalyticsParams, TrendAnalyticsParams } from '@/features/analytics/types'

export const analyticsKeys = {
  all: ['analytics'] as const,
  trends: (params: TrendAnalyticsParams) => [...analyticsKeys.all, 'trends', params] as const,
  categories: (params: CategoryAnalyticsParams) => [...analyticsKeys.all, 'categories', params] as const,
  calendarHeatmap: (params: CalendarHeatmapParams) => [...analyticsKeys.all, 'calendar-heatmap', params] as const,
}
