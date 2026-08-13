import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CategoriesTable } from '@/features/admin/components/categories-tab/categories-table'
import { CategoriesTableSkeleton } from '@/features/admin/components/categories-tab/categories-table-skeleton'
import { CategoryFormDialog } from '@/features/admin/components/categories-tab/category-form-dialog'
import { DeleteCategoryDialog } from '@/features/admin/components/categories-tab/delete-category-dialog'
import { useAdminCategories } from '@/features/admin/hooks/use-admin-categories'
import type { SystemCategoryResponse } from '@/features/admin/types'

type StatusFilter = 'all' | 'active' | 'inactive'

export function CategoriesTab() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [formTarget, setFormTarget] = useState<SystemCategoryResponse | 'new' | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<SystemCategoryResponse | null>(null)

  const { data: categories, isLoading } = useAdminCategories({
    search: search.trim() || undefined,
    is_active: status === 'all' ? undefined : status === 'active',
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 sm:max-w-64">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories"
              className="pl-8"
            />
          </div>
          <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setFormTarget('new')}>
          <Plus className="size-4" />
          New Category
        </Button>
      </div>

      {isLoading ? (
        <CategoriesTableSkeleton />
      ) : categories && categories.length > 0 ? (
        <CategoriesTable categories={categories} onEdit={setFormTarget} onDelete={setDeleteTarget} />
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">No categories found.</p>
      )}

      <CategoryFormDialog
        open={formTarget !== null}
        onOpenChange={(open) => !open && setFormTarget(null)}
        category={formTarget === 'new' || formTarget === null ? undefined : formTarget}
      />
      <DeleteCategoryDialog category={deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} />
    </div>
  )
}
