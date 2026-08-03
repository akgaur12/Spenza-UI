import { useState } from 'react'
import { CategoryMultiCombobox } from '@/features/expenses/components/category-multi-combobox'
import { DateRangeFilter } from '@/features/expenses/components/date-range-filter'
import { SortMenu } from '@/features/expenses/components/sort-menu'
import { useCategories } from '@/features/categories/hooks/use-categories'
import type { ExpenseDateRange, ExpenseSortOption } from '@/features/expenses/types'
import { useDebounce } from '@/hooks/use-debounce'

interface ExpenseFiltersProps {
  categoryIds: string[]
  onCategoryChange: (categoryIds: string[]) => void
  dateRange: ExpenseDateRange | null
  onDateRangeChange: (range: ExpenseDateRange | null) => void
  sort: ExpenseSortOption
  onSortChange: (sort: ExpenseSortOption) => void
}

export function ExpenseFilters({
  categoryIds,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  sort,
  onSortChange,
}: ExpenseFiltersProps) {
  const [categorySearch, setCategorySearch] = useState('')
  const debouncedCategorySearch = useDebounce(categorySearch, 250)
  const categoriesQuery = useCategories({ search: debouncedCategorySearch || undefined })

  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
      <CategoryMultiCombobox
        categories={categoriesQuery.data?.items ?? []}
        search={categorySearch}
        onSearchChange={setCategorySearch}
        selectedIds={categoryIds}
        onChange={onCategoryChange}
        className="w-full sm:w-44"
      />
      <DateRangeFilter value={dateRange} onChange={onDateRangeChange} className="w-full sm:w-auto" />
      <SortMenu value={sort} onChange={onSortChange} className="w-full sm:w-auto" />
    </div>
  )
}
