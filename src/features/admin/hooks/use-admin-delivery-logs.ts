import { useQuery } from '@tanstack/react-query'
import { listDeliveryLogs } from '@/features/admin/api/admin-notifications.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type { DeliveryLogListParams } from '@/features/admin/types'

export function useAdminDeliveryLogs(params: DeliveryLogListParams) {
  return useQuery({
    queryKey: adminKeys.deliveryLogs(params),
    queryFn: () => listDeliveryLogs(params),
    staleTime: 30 * 1000,
  })
}
