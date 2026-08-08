import { API_ENDPOINTS } from '@/config'
import type {
  RecurringExpense,
  RecurringExpenseCreateRequest,
  RecurringExpenseListParams,
  RecurringExpenseListResponse,
  RecurringExpenseUpdateRequest,
} from '@/features/recurring-expenses/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function listRecurringExpenses(
  params: RecurringExpenseListParams = {},
): Promise<RecurringExpenseListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<RecurringExpenseListResponse>>(
    API_ENDPOINTS.recurringExpenses.list,
    { params },
  )
  return data.data
}

export async function createRecurringExpense(payload: RecurringExpenseCreateRequest): Promise<RecurringExpense> {
  const { data } = await apiClient.post<ApiSuccessResponse<RecurringExpense>>(
    API_ENDPOINTS.recurringExpenses.list,
    payload,
  )
  return data.data
}

export async function updateRecurringExpense(
  recurringExpenseId: string,
  payload: RecurringExpenseUpdateRequest,
): Promise<RecurringExpense> {
  const { data } = await apiClient.patch<ApiSuccessResponse<RecurringExpense>>(
    API_ENDPOINTS.recurringExpenses.detail(recurringExpenseId),
    payload,
  )
  return data.data
}

export async function deleteRecurringExpense(recurringExpenseId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.recurringExpenses.detail(recurringExpenseId))
}

export async function pauseRecurringExpense(recurringExpenseId: string): Promise<RecurringExpense> {
  const { data } = await apiClient.patch<ApiSuccessResponse<RecurringExpense>>(
    API_ENDPOINTS.recurringExpenses.pause(recurringExpenseId),
  )
  return data.data
}

export async function resumeRecurringExpense(recurringExpenseId: string): Promise<RecurringExpense> {
  const { data } = await apiClient.patch<ApiSuccessResponse<RecurringExpense>>(
    API_ENDPOINTS.recurringExpenses.resume(recurringExpenseId),
  )
  return data.data
}

export async function runRecurringExpenseNow(recurringExpenseId: string): Promise<RecurringExpense> {
  const { data } = await apiClient.post<ApiSuccessResponse<RecurringExpense>>(
    API_ENDPOINTS.recurringExpenses.run(recurringExpenseId),
  )
  return data.data
}
