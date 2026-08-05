export type TrendInterval = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface TrendDataPoint {
  period: string
  start_date: string | null
  end_date: string | null
  total: string
  expense_count: number
  average_expense: string
}

export interface TrendAnalyticsResponse {
  interval: TrendInterval
  start_date: string
  end_date: string
  total_spending: string
  expense_count: number
  data: TrendDataPoint[]
}

export interface TrendAnalyticsParams {
  interval?: TrendInterval
  start_date?: string
  end_date?: string
}

export interface CategoryAnalyticsItem {
  category_id: string
  name: string
  icon: string | null
  total: string
  expense_count: number
  percentage: number
  average_expense: string
}

export interface CategoryAnalyticsResponse {
  start_date: string
  end_date: string
  total_spending: string
  expense_count: number
  categories: CategoryAnalyticsItem[]
}

export interface CategoryAnalyticsParams {
  start_date?: string
  end_date?: string
}

export interface CalendarHeatmapDay {
  date: string
  month: number
  day: number
  total: string
  expense_count: number
  is_future: boolean
}

export interface CalendarHeatmapResponse {
  year: number
  total_spending: string
  expense_count: number
  max_daily_spending: string
  data: CalendarHeatmapDay[]
}

export interface CalendarHeatmapParams {
  year?: number
}

/** The global filter bar's date-range options — distinct from the Expenses feature's presets (rolling windows, not calendar weeks). */
export type AnalyticsDateRangePreset = 'today' | 'last7days' | 'month' | 'last30days' | 'year' | 'custom'

export interface AnalyticsDateRange {
  preset: AnalyticsDateRangePreset
  startDate: string
  endDate: string
}

export interface AnalyticsFilters {
  dateRange: AnalyticsDateRange
  categoryId: string | null
}
