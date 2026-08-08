import { API_ENDPOINTS } from '@/config'
import type {
  MarkAllReadResponse,
  Notification,
  NotificationListParams,
  NotificationListResponse,
  NotificationPreference,
  NotificationPreferenceListResponse,
  NotificationPreferenceUpdateRequest,
  NotificationType,
  UnreadCountResponse,
} from '@/features/notifications/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function listNotifications(params: NotificationListParams = {}): Promise<NotificationListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<NotificationListResponse>>(API_ENDPOINTS.notifications.list, {
    params,
  })
  return data.data
}

export async function getUnreadNotificationCount(): Promise<UnreadCountResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<UnreadCountResponse>>(API_ENDPOINTS.notifications.unreadCount)
  return data.data
}

export async function markNotificationRead(notificationId: string): Promise<Notification> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Notification>>(
    API_ENDPOINTS.notifications.markRead(notificationId),
  )
  return data.data
}

export async function markAllNotificationsRead(): Promise<MarkAllReadResponse> {
  const { data } = await apiClient.patch<ApiSuccessResponse<MarkAllReadResponse>>(API_ENDPOINTS.notifications.readAll)
  return data.data
}

export async function deleteNotification(notificationId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.notifications.detail(notificationId))
}

export async function listNotificationPreferences(): Promise<NotificationPreferenceListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<NotificationPreferenceListResponse>>(
    API_ENDPOINTS.notificationPreferences.list,
  )
  return data.data
}

export async function updateNotificationPreference(
  notificationType: NotificationType,
  payload: NotificationPreferenceUpdateRequest,
): Promise<NotificationPreference> {
  const { data } = await apiClient.patch<ApiSuccessResponse<NotificationPreference>>(
    API_ENDPOINTS.notificationPreferences.update(notificationType),
    payload,
  )
  return data.data
}
