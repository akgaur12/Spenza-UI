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
  category_id?: string
  start_date?: string
  end_date?: string
  min_amount?: number
  max_amount?: number
  search?: string
  page?: number
  page_size?: number
}
