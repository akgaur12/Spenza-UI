import { API_ENDPOINTS } from '@/config'
import type {
  Expense,
  ExpenseCreateRequest,
  ExpenseListParams,
  ExpenseListResponse,
  ExpenseUpdateRequest,
} from '@/features/expenses/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function listExpenses(params: ExpenseListParams = {}): Promise<ExpenseListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<ExpenseListResponse>>(API_ENDPOINTS.expenses.list, {
    params,
    // Backend expects repeated `category_id=a&category_id=b`, not axios's default `category_id[]=a`.
    paramsSerializer: { indexes: null },
  })
  return data.data
}

export async function createExpense(payload: ExpenseCreateRequest): Promise<Expense> {
  const { data } = await apiClient.post<ApiSuccessResponse<Expense>>(API_ENDPOINTS.expenses.list, payload)
  return data.data
}

export async function updateExpense(expenseId: string, payload: ExpenseUpdateRequest): Promise<Expense> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Expense>>(
    API_ENDPOINTS.expenses.detail(expenseId),
    payload,
  )
  return data.data
}

export async function deleteExpense(expenseId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.expenses.detail(expenseId))
}
