import { API_ENDPOINTS } from '@/config'
import type {
  BroadcastNotificationRequest,
  BroadcastNotificationResponse,
  DeliveryLogListParams,
  DeliveryLogListResponse,
} from '@/features/admin/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

const endpoints = API_ENDPOINTS.admin

export async function broadcastNotification(
  payload: BroadcastNotificationRequest,
): Promise<BroadcastNotificationResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<BroadcastNotificationResponse>>(
    endpoints.notificationsBroadcast,
    payload,
  )
  return data.data
}

export async function listDeliveryLogs(params: DeliveryLogListParams): Promise<DeliveryLogListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<DeliveryLogListResponse>>(
    endpoints.notificationDeliveryLogs,
    { params },
  )
  return data.data
}
