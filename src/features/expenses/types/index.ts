export interface ExpenseCategory {
  id: string
  name: string
  icon: string | null
}

export interface Expense {
  id: string
  description: string
  amount: string
  spent_at: string
  category: ExpenseCategory
  created_at: string
  updated_at: string
}

export interface ExpenseListResponse {
  items: Expense[]
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface ExpenseListParams {
  category_id?: string[]
  start_date?: string
  end_date?: string
  min_amount?: number
  max_amount?: number
  search?: string
  page?: number
  page_size?: number
}

export type ExpenseInfiniteParams = Omit<ExpenseListParams, 'page'>

export interface ExpenseCreateRequest {
  category_id: string
  description: string
  amount: string
  spent_at: string
}

export interface ExpenseUpdateRequest {
  category_id?: string
  description?: string
  amount?: string
  spent_at?: string
}

export type ExpenseSortOption = 'newest' | 'oldest' | 'highest' | 'lowest'

export type ExpenseDateRangePreset = 'today' | 'week' | 'month' | 'year' | 'custom'

export interface ExpenseDateRange {
  preset: ExpenseDateRangePreset
  startDate?: string
  endDate?: string
}
