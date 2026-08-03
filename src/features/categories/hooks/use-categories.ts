import { useQuery } from '@tanstack/react-query'
import { listCategories } from '@/features/categories/api/categories.api'
import type { CategoryListParams } from '@/features/categories/types'
import { categoriesKeys } from './query-keys'

export function useCategories(params: CategoryListParams = {}) {
  return useQuery({
    queryKey: categoriesKeys.list(params),
    queryFn: () => listCategories(params),
    staleTime: 5 * 60 * 1000,
  })
}
