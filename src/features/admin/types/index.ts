export type UserRole = 'user' | 'admin'

export type AdminSectionKey = 'overview' | 'users' | 'categories' | 'notifications' | 'email'

export interface AdminUserResponse {
  id: string
  username: string
  email: string
  full_name: string | null
  role: UserRole
  is_verified: boolean
  is_active: boolean
  failed_login_attempts: number
  locked_until: string | null
  created_at: string
  updated_at: string
}

export interface PaginatedUsersResponse {
  items: AdminUserResponse[]
  total: number
  page: number
  page_size: number
}

export interface AdminUsersListParams {
  page: number
  page_size: number
}

export interface SetUserActiveRequest {
  is_active: boolean
}

export interface UpdateUserRoleRequest {
  role: UserRole
}

export interface SessionInfo {
  id: string
  device: string | null
  ip_address: string | null
  created_at: string
  last_used_at: string | null
}

export interface SessionListResponse {
  items: SessionInfo[]
}

export interface RevokedSessionsResponse {
  revoked: number
}

export type { CategoryResponse as SystemCategoryResponse } from '@/features/categories/types'

export interface AdminCategoryListParams {
  is_active?: boolean
  search?: string
}

export interface AdminCategoryCreateRequest {
  name: string
  icon?: string | null
}

/** Superset of CategoryUpdateRequest — admin can additionally toggle a system category active/inactive. */
export interface AdminCategoryUpdateRequest {
  name?: string
  icon?: string | null
  is_active?: boolean
}

export type NotificationPriority = 'low' | 'normal' | 'high' | 'critical'

export type NotificationType =
  | 'welcome'
  | 'report_ready'
  | 'recurring_expense_created'
  | 'password_changed'
  | 'system'
  | 'ai_insight'
  | 'security_alert'
  | 'subscription_expiring'
  | 'weekly_summary'

export type DeliveryChannel = 'in_app' | 'email'

export type DeliveryLogStatus = 'pending' | 'success' | 'failed'

/** `user_ids` omitted broadcasts to every active, verified user. */
export interface BroadcastNotificationRequest {
  title: string
  message: string
  notification_type?: NotificationType
  priority?: NotificationPriority
  user_ids?: string[] | null
}

export interface BroadcastNotificationResponse {
  targeted: number
  sent: number
  skipped: number
}

export interface DeliveryLogResponse {
  id: string
  notification_id: string | null
  channel: DeliveryChannel
  status: DeliveryLogStatus
  attempt: number
  provider: string | null
  error_message: string | null
  sent_at: string | null
  created_at: string
}

export interface DeliveryLogListResponse {
  items: DeliveryLogResponse[]
  total: number
  page: number
  page_size: number
}

export interface DeliveryLogListParams {
  status?: DeliveryLogStatus
  channel?: DeliveryChannel
  page: number
  page_size: number
}

/** Secrets (SMTP password, Resend API key) are never included by the backend. */
export interface EmailConfigResponse {
  backend: string
  sender_name: string
  sender_email: string | null
  smtp_server: string
  smtp_port: number
  smtp_use_tls: boolean
  resend_configured: boolean
  max_retries: number
  retry_base_delay_seconds: number
}

/**
 * A custom, admin-composed email sent directly to one or more specific
 * users — always delivered regardless of the recipients' notification
 * preferences, and not recorded as a `Notification`.
 */
export interface SendAdminEmailRequest {
  user_ids: string[]
  subject: string
  message: string
}

export interface SendAdminEmailResponse {
  targeted: number
  sent: number
  failed: number
  unknown_user_ids: string[]
}

export interface UserStats {
  total: number
  active: number
  inactive: number
  verified: number
  admins: number
  locked: number
  signups_last_7_days: number
  signups_last_30_days: number
}

export interface ExpenseStats {
  total_count: number
  total_amount: string
  created_last_30_days: number
}

export interface RecurringExpenseStats {
  total: number
  active: number
}

export interface CategoryStats {
  system_count: number
  custom_count: number
}

export interface NotificationStats {
  total_sent: number
  delivery_failures_last_7_days: number
}

export interface AdminStatsOverview {
  users: UserStats
  expenses: ExpenseStats
  recurring_expenses: RecurringExpenseStats
  categories: CategoryStats
  notifications: NotificationStats
}
