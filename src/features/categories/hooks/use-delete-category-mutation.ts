import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { deleteCategory } from '@/features/categories/api/categories.api'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'
import { categoriesKeys } from './query-keys'

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all })
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
      toast.success('Category deleted')
    },
    onError: (error) => {
      toast.error('Could not delete category', { description: getErrorMessage(error) })
    },
  })
}
