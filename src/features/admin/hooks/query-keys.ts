import type { AdminCategoryListParams, AdminUsersListParams, DeliveryLogListParams } from '@/features/admin/types'

export const adminKeys = {
  all: ['admin'] as const,
  isAdmin: () => [...adminKeys.all, 'is-admin'] as const,
  users: (params: AdminUsersListParams) => [...adminKeys.all, 'users', params] as const,
  userSessions: (userId: string) => [...adminKeys.all, 'users', userId, 'sessions'] as const,
  categories: (params: AdminCategoryListParams) => [...adminKeys.all, 'categories', params] as const,
  deliveryLogs: (params: DeliveryLogListParams) => [...adminKeys.all, 'delivery-logs', params] as const,
  emailConfig: () => [...adminKeys.all, 'email-config'] as const,
  statsOverview: () => [...adminKeys.all, 'stats-overview'] as const,
}
