import type {
  AdminCategoryListParams,
  AdminUsersListParams,
  AIAssistantOverviewParams,
  AIAssistantProviderUsageParams,
  AIAssistantUsageTimeseriesParams,
  AIAssistantUserUsageParams,
  DeliveryLogListParams,
} from '@/features/admin/types'

export const adminKeys = {
  all: ['admin'] as const,
  isAdmin: () => [...adminKeys.all, 'is-admin'] as const,
  users: (params: AdminUsersListParams) => [...adminKeys.all, 'users', params] as const,
  userSessions: (userId: string) => [...adminKeys.all, 'users', userId, 'sessions'] as const,
  userAiAssistant: (userId: string) => [...adminKeys.all, 'users', userId, 'ai-assistant'] as const,
  aiAssistantOverview: (params: AIAssistantOverviewParams) => [...adminKeys.all, 'ai-assistant', 'overview', params] as const,
  aiAssistantProviders: (params: AIAssistantProviderUsageParams) =>
    [...adminKeys.all, 'ai-assistant', 'providers', params] as const,
  aiAssistantUsageTimeseries: (params: AIAssistantUsageTimeseriesParams) =>
    [...adminKeys.all, 'ai-assistant', 'usage-timeseries', params] as const,
  aiAssistantUsers: (params: AIAssistantUserUsageParams) => [...adminKeys.all, 'ai-assistant', 'users', params] as const,
  categories: (params: AdminCategoryListParams) => [...adminKeys.all, 'categories', params] as const,
  deliveryLogs: (params: DeliveryLogListParams) => [...adminKeys.all, 'delivery-logs', params] as const,
  emailConfig: () => [...adminKeys.all, 'email-config'] as const,
  statsOverview: () => [...adminKeys.all, 'stats-overview'] as const,
}
