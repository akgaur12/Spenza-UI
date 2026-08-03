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
