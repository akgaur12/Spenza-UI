import { useQuery } from '@tanstack/react-query'
import { getUserAiAssistantPermission } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'

export function useUserAiAssistantPermission(userId: string | null) {
  return useQuery({
    queryKey: adminKeys.userAiAssistant(userId ?? ''),
    queryFn: () => getUserAiAssistantPermission(userId!),
    enabled: userId !== null,
  })
}
