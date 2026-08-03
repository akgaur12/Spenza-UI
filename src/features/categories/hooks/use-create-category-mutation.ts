import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/features/categories/api/categories.api'
import { getErrorMessage } from '@/lib/errors'
import { toast } from 'sonner'
import { categoriesKeys } from './query-keys'

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all })
    },
    onError: (error) => {
      toast.error('Could not create category', { description: getErrorMessage(error) })
    },
  })
}
