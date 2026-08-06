import { createFileRoute } from '@tanstack/react-router'
import { CategoriesPage } from '@/features/categories/categories-page'

/** Lets other pages (e.g. Overview's Quick Actions) deep-link straight into the create-category modal. */
export interface CategoriesSearch {
  create?: true
}

export const Route = createFileRoute('/_app/categories')({
  validateSearch: (search: Record<string, unknown>): CategoriesSearch => ({
    create: search.create === true || search.create === 'true' ? true : undefined,
  }),
  component: CategoriesPage,
})
