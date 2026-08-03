export interface TodaySummary {
  total: string
  expense_count: number
}

export interface WeekSummary {
  total: string
  expense_count: number
  daily_average: string
}

export interface MonthSummary {
  total: string
  expense_count: number
  daily_average: string
  average_expense: string
}

export interface YearSummary {
  total: string
  expense_count: number
  monthly_average: string
  average_expense: string
}

export interface PreviousMonthSummary {
  total: string
  expense_count: number
}

export type MonthTrend = 'up' | 'down' | 'same'

export interface MonthComparison {
  difference: string
  percentage_change: number | null
  trend: MonthTrend
}

export interface DashboardCategorySummary {
  category_id: string
  name: string
  icon: string | null
  total: string
  expense_count: number
  percentage: number
}

export interface LargestExpenseCategory {
  id: string
  name: string
  icon: string | null
}

export interface LargestExpenseSummary {
  id: string
  description: string
  amount: string
  spent_at: string
  category: LargestExpenseCategory
}

export interface DashboardSummaryResponse {
  today: TodaySummary
  this_week: WeekSummary
  this_month: MonthSummary
  this_year: YearSummary
  previous_month: PreviousMonthSummary
  month_comparison: MonthComparison
  top_category: DashboardCategorySummary | null
  largest_expense: LargestExpenseSummary | null
}
