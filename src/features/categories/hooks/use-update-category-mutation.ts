import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { updateCategory } from '@/features/categories/api/categories.api'
import type { CategoryUpdateRequest } from '@/features/categories/types'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'
import { categoriesKeys } from './query-keys'

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { categoryId: string; payload: CategoryUpdateRequest }) =>
      updateCategory(variables.categoryId, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all })
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    },
    onError: (error) => {
      toast.error('Could not update category', { description: getErrorMessage(error) })
    },
  })
}
