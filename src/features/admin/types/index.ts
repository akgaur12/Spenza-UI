import type { TrendInterval } from '@/features/analytics/types'
import type { LLMProvider } from '@/features/assistant/types/chat.types'

export type UserRole = 'user' | 'admin'

export type AdminSectionKey = 'overview' | 'users' | 'ai-assistant' | 'categories' | 'notifications' | 'email'

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

/** Admin-facing view: every configured limit plus the user's current usage. */
export interface AIAssistantPermissionResponse {
  enabled: boolean
  max_messages_per_minute: number | null
  max_messages_per_day: number | null
  max_messages_per_month: number | null
  max_new_chats_per_day: number | null
  max_new_chats_per_month: number | null
  messages_sent_today: number
  messages_sent_this_month: number
  chats_created_today: number
  chats_created_this_month: number
}

/** PATCH semantics — omit a field to leave it untouched, send explicit `null` to make that limit unlimited. */
export interface AIAssistantPermissionUpdate {
  enabled?: boolean
  max_messages_per_minute?: number | null
  max_messages_per_day?: number | null
  max_messages_per_month?: number | null
  max_new_chats_per_day?: number | null
  max_new_chats_per_month?: number | null
}

export interface AIAssistantRunStatusCounts {
  queued: number
  running: number
  completed: number
  failed: number
  cancelled: number
}

export interface AIAssistantOverviewParams {
  /** Scopes every count to a single user instead of system-wide totals. */
  user_id?: string
}

/** System-wide totals (or one user's, when `user_id` is passed) — powers the observability page's stat cards. */
export interface AIAssistantOverview {
  total_chats: number
  total_messages_sent: number
  total_runs: number
  runs_by_status: AIAssistantRunStatusCounts
  runs_last_7_days: number
  runs_last_30_days: number
  messages_sent_last_7_days: number
  messages_sent_last_30_days: number
  active_users_last_7_days: number
  active_users_last_30_days: number
  users_with_access_enabled: number
  total_input_tokens: number | null
  total_output_tokens: number | null
  total_tool_calls: number
  average_latency_ms: number | null
  total_estimated_cost_usd: string | null
}

export interface AIAssistantProviderUsage {
  provider: LLMProvider
  model: string
  total_runs: number
  completed: number
  failed: number
  cancelled: number
  input_tokens: number | null
  output_tokens: number | null
  tool_calls: number
  average_latency_ms: number | null
  estimated_cost_usd: string | null
}

export interface AIAssistantProviderUsageResponse {
  start_date: string
  end_date: string
  total_estimated_cost_usd: string | null
  providers: AIAssistantProviderUsage[]
}

export interface AIAssistantProviderUsageParams {
  start_date?: string
  end_date?: string
  user_id?: string
}

export interface AIAssistantUsageBucket {
  period: string
  start_date: string
  end_date: string | null
  messages_sent: number
  runs_completed: number
  runs_failed: number
  runs_cancelled: number
  input_tokens: number | null
  output_tokens: number | null
  tool_calls: number
  estimated_cost_usd: string | null
}

export interface AIAssistantUsageTimeseries {
  interval: TrendInterval
  start_date: string
  end_date: string
  data: AIAssistantUsageBucket[]
}

export interface AIAssistantUsageTimeseriesParams {
  interval?: TrendInterval
  start_date?: string
  end_date?: string
  user_id?: string
}

export type AIAssistantUserSortBy = 'messages_sent' | 'chats_created' | 'last_active'
export type SortOrder = 'asc' | 'desc'

/** Only users who have used the assistant at least once — a fresh account with no history won't appear. */
export interface AIAssistantUserUsage {
  user_id: string
  username: string
  email: string
  enabled: boolean
  total_chats: number
  total_messages_sent: number
  messages_sent_last_30_days: number
  last_active_at: string | null
  estimated_cost_usd: string | null
}

export interface AIAssistantUserUsageListResponse {
  items: AIAssistantUserUsage[]
  total: number
  page: number
  page_size: number
}

export interface AIAssistantUserUsageParams {
  page: number
  page_size: number
  sort_by?: AIAssistantUserSortBy
  order?: SortOrder
  user_id?: string
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
