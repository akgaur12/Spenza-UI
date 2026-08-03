import type { CategoryListParams } from '@/features/categories/types'

export const categoriesKeys = {
  all: ['categories'] as const,
  list: (params: CategoryListParams) => [...categoriesKeys.all, 'list', params] as const,
}
