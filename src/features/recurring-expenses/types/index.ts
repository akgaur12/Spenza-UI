export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export type GenerationMode = 'auto' | 'reminder'

export type RecurringExpenseStatus = 'active' | 'paused' | 'completed' | 'cancelled'

export type RecurringExpenseSortField = 'created_at' | 'next_run_date' | 'amount' | 'description'

export type SortOrder = 'asc' | 'desc'

export interface RecurringExpenseCategory {
  id: string
  name: string
  icon: string | null
}

export interface RecurringExpense {
  id: string
  description: string
  amount: string
  category: RecurringExpenseCategory
  frequency: RecurringFrequency
  generation_mode: GenerationMode
  status: RecurringExpenseStatus
  start_date: string
  end_date: string | null
  next_run_date: string
  last_run_date: string | null
  created_at: string
  updated_at: string
}

export interface RecurringExpenseListResponse {
  items: RecurringExpense[]
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface RecurringExpenseListParams {
  status?: RecurringExpenseStatus
  frequency?: RecurringFrequency
  generation_mode?: GenerationMode
  search?: string
  sort_by?: RecurringExpenseSortField
  sort_order?: SortOrder
  page?: number
  page_size?: number
}

export type RecurringExpenseInfiniteParams = Omit<RecurringExpenseListParams, 'page'>

export interface RecurringExpenseCreateRequest {
  category_id: string
  description: string
  amount: string
  frequency: RecurringFrequency
  generation_mode: GenerationMode
  start_date: string
  end_date?: string
}

export interface RecurringExpenseUpdateRequest {
  category_id?: string
  description?: string
  amount?: string
  frequency?: RecurringFrequency
  generation_mode?: GenerationMode
  start_date?: string
  end_date?: string | null
}
