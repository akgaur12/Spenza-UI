import { API_ENDPOINTS } from '@/config'
import type { ExpenseListParams, ExpenseListResponse } from '@/features/expenses/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function listExpenses(params: ExpenseListParams = {}): Promise<ExpenseListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<ExpenseListResponse>>(API_ENDPOINTS.expenses.list, {
    params,
  })
  return data.data
}
