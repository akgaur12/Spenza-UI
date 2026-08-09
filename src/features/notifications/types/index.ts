/** Mirrors the backend's `NotificationType` StrEnum — new members can appear at any time, so
 * every consumer (icon map, labels, action resolver) must fall back gracefully instead of
 * assuming this list is exhaustive. */
export type NotificationType =
  | 'welcome'
  | 'report_ready'
  | 'recurring_expense_created'
  | 'password_changed'
  | 'system'
  | 'ai_insight'
  | 'security_alert'
  | 'subscription_expiring'
  | 'budget_alert'
  | 'weekly_summary'
  | (string & {})

export type NotificationPriority = 'low' | 'normal' | 'high' | 'critical'

export type NotificationSortField = 'created_at' | 'priority'
export type SortOrder = 'asc' | 'desc'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  /** Opaque per-type bag of data — only `report_ready` has a confirmed shape today (`report_type`, `period_label`). */
  payload: Record<string, unknown>
  priority: NotificationPriority
  is_read: boolean
  read_at: string | null
  created_at: string
}

export interface NotificationListResponse {
  items: Notification[]
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface NotificationListParams {
  is_read?: boolean
  notification_type?: NotificationType
  priority?: NotificationPriority
  sort_by?: NotificationSortField
  sort_order?: SortOrder
  page?: number
  page_size?: number
}

export type NotificationInfiniteParams = Omit<NotificationListParams, 'page'>

export interface UnreadCountResponse {
  count: number
}

export interface MarkAllReadResponse {
  updated: number
}

export interface NotificationPreference {
  notification_type: NotificationType
  enabled: boolean
  in_app_enabled: boolean
  email_enabled: boolean
  delivery_time: string | null
  timezone: string | null
  is_default: boolean
}

export interface NotificationPreferenceListResponse {
  items: NotificationPreference[]
}

export interface NotificationPreferenceUpdateRequest {
  enabled?: boolean
  in_app_enabled?: boolean
  email_enabled?: boolean
}
