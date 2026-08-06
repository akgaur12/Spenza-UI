import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { CategoryFilter, type CategoryFilterValue } from '@/features/categories/components/category-filter'
import { CategoryModal } from '@/features/categories/components/category-modal'
import { CategorySearch } from '@/features/categories/components/category-search'
import { CategorySection } from '@/features/categories/components/category-section'
import { CategorySkeleton } from '@/features/categories/components/category-skeleton'
import { DeleteCategoryDialog } from '@/features/categories/components/delete-category-dialog'
import { EmptyCategories } from '@/features/categories/components/empty-categories'
import { NoCategoriesFound } from '@/features/categories/components/no-categories-found'
import { useCategoriesWithStats } from '@/features/categories/hooks/use-categories-with-stats'
import type { CategoryWithStats } from '@/features/categories/types'
import { useDebounce } from '@/hooks/use-debounce'

const routeApi = getRouteApi('/_app/categories')

export function CategoriesPage() {
  const { create } = routeApi.useSearch()
  const [search, setSearch] = useState('')
  const [searchResetKey, setSearchResetKey] = useState(0)
  const [filter, setFilter] = useState<CategoryFilterValue>('all')
  const [modalTarget, setModalTarget] = useState<CategoryWithStats | 'create' | null>(create ? 'create' : null)
  const [deleteTarget, setDeleteTarget] = useState<CategoryWithStats | null>(null)
  const debouncedSearch = useDebounce(search, 350)

  function clearSearch() {
    setSearch('')
    // CategorySearch owns its own debounced input state and only seeds it from `value` on
    // mount — remount it so an external clear (this button) actually empties the input.
    setSearchResetKey((key) => key + 1)
  }

  const query = useCategoriesWithStats({ search: debouncedSearch || undefined })

  if (query.isPending) return <CategorySkeleton />
  if (query.isError) return <SectionError message="Unable to load categories." onRetry={query.refetch} />

  const defaultCategories = query.items.filter((category) => category.is_system)
  const myCategories = query.items.filter((category) => !category.is_system)
  const showDefault = filter !== 'my'
  const showMy = filter !== 'default'
  const hasSearch = debouncedSearch.trim().length > 0
  const totalVisible = (showDefault ? defaultCategories.length : 0) + (showMy ? myCategories.length : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <Button onClick={() => setModalTarget('create')}>
          <Plus />
          Create Category
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategorySearch key={searchResetKey} value={search} onChange={setSearch} />
        <CategoryFilter value={filter} onChange={setFilter} />
      </div>

      {hasSearch && totalVisible === 0 ? (
        <NoCategoriesFound onClearSearch={clearSearch} />
      ) : (
        <div className="space-y-8">
          {showDefault && (
            <CategorySection
              title="Default Categories"
              categories={defaultCategories}
              onEdit={setModalTarget}
              onDelete={setDeleteTarget}
            />
          )}
          {showMy && (
            <CategorySection
              title="My Categories"
              categories={myCategories}
              onEdit={setModalTarget}
              onDelete={setDeleteTarget}
              emptyContent={<EmptyCategories onCreate={() => setModalTarget('create')} />}
            />
          )}
        </div>
      )}

      <CategoryModal
        open={modalTarget !== null}
        onOpenChange={(open) => !open && setModalTarget(null)}
        category={modalTarget && modalTarget !== 'create' ? modalTarget : undefined}
      />

      <DeleteCategoryDialog category={deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} />
    </div>
  )
}
