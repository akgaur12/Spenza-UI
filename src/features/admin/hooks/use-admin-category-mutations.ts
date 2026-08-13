import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createAdminCategory,
  deleteAdminCategory,
  updateAdminCategory,
} from '@/features/admin/api/admin-categories.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import type { AdminCategoryUpdateRequest } from '@/features/admin/types'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { categoriesKeys } from '@/features/categories/hooks/query-keys'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'

/** System categories are visible in every user's own category list/spend breakdowns too. */
function invalidateSharedCategoryData(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: adminKeys.all })
  queryClient.invalidateQueries({ queryKey: categoriesKeys.all })
  queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
  queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
}

export function useCreateAdminCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAdminCategory,
    onSuccess: () => invalidateSharedCategoryData(queryClient),
    onError: (error) => {
      toast.error('Could not create category', { description: getErrorMessage(error) })
    },
  })
}

export function useUpdateAdminCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { categoryId: string; payload: AdminCategoryUpdateRequest }) =>
      updateAdminCategory(variables.categoryId, variables.payload),
    onSuccess: () => invalidateSharedCategoryData(queryClient),
    onError: (error) => {
      toast.error('Could not update category', { description: getErrorMessage(error) })
    },
  })
}

export function useDeleteAdminCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (categoryId: string) => deleteAdminCategory(categoryId),
    onSuccess: () => {
      invalidateSharedCategoryData(queryClient)
      toast.success('Category deleted')
    },
    onError: (error) => {
      toast.error('Could not delete category', { description: getErrorMessage(error) })
    },
  })
}
