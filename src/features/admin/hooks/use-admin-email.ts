import { useQuery } from '@tanstack/react-query'
import { getEmailConfig } from '@/features/admin/api/admin-email.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'

export function useEmailConfig() {
  return useQuery({
    queryKey: adminKeys.emailConfig(),
    queryFn: getEmailConfig,
    staleTime: 5 * 60 * 1000,
  })
}
