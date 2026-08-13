import { useQuery } from '@tanstack/react-query'
import { listAdminUsers } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type { AdminUsersListParams } from '@/features/admin/types'

export function useAdminUsers(params: AdminUsersListParams) {
  return useQuery({
    queryKey: adminKeys.users(params),
    queryFn: () => listAdminUsers(params),
    staleTime: 30 * 1000,
  })
}
