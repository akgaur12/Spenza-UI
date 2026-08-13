import { useQuery } from '@tanstack/react-query'
import { listUserSessions } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'

export function useUserSessions(userId: string | null) {
  return useQuery({
    queryKey: adminKeys.userSessions(userId ?? ''),
    queryFn: () => listUserSessions(userId!),
    enabled: userId !== null,
  })
}
