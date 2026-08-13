import { useQuery } from '@tanstack/react-query'
import { listAdminCategories } from '@/features/admin/api/admin-categories.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type { AdminCategoryListParams } from '@/features/admin/types'

export function useAdminCategories(params: AdminCategoryListParams = {}) {
  return useQuery({
    queryKey: adminKeys.categories(params),
    queryFn: () => listAdminCategories(params),
    staleTime: 30 * 1000,
  })
}
