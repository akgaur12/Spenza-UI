import { API_ENDPOINTS } from '@/config'
import type { EmailConfigResponse, SendAdminEmailRequest, SendAdminEmailResponse } from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.admin

export async function getEmailConfig(): Promise<EmailConfigResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<EmailConfigResponse>>(endpoints.emailConfig)
  return data.data
}

export async function sendAdminEmail(payload: SendAdminEmailRequest): Promise<SendAdminEmailResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<SendAdminEmailResponse>>(endpoints.emailSend, payload)
  return data.data
}
