import { useState } from 'react'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'
import { DeleteExpenseDialog } from '@/features/expenses/components/delete-expense-dialog'
import { ExpenseFilters } from '@/features/expenses/components/expense-filters'
import { ExpenseHeader } from '@/features/expenses/components/expense-header'
import { ExpenseModal } from '@/features/expenses/components/expense-modal'
import { ExpenseSearch } from '@/features/expenses/components/expense-search'
import { ExpenseTimeline } from '@/features/expenses/components/expense-timeline'
import { useExpenseFilters } from '@/features/expenses/hooks/use-expense-filters'
import type { Expense } from '@/features/expenses/types'

export function ExpensesPage() {
  const filters = useExpenseFilters()
  const { openAddExpenseModal } = useAddExpenseModal()
  const [editTarget, setEditTarget] = useState<Expense | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null)

  return (
    <div className="space-y-6">
      <ExpenseHeader onAddExpense={openAddExpenseModal} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <ExpenseSearch key={filters.resetKey} value={filters.search} onChange={filters.setSearch} />
        <ExpenseFilters
          categoryIds={filters.categoryIds}
          onCategoryChange={filters.setCategoryIds}
          dateRange={filters.dateRange}
          onDateRangeChange={filters.setDateRange}
          sort={filters.sort}
          onSortChange={filters.setSort}
        />
      </div>

      <ExpenseTimeline
        params={filters.params}
        sort={filters.sort}
        hasActiveFilters={filters.hasActiveFilters}
        onAddExpense={openAddExpenseModal}
        onClearFilters={filters.clearFilters}
        onEdit={(expense) => setEditTarget(expense)}
        onDelete={(expense) => setDeleteTarget(expense)}
      />

      <ExpenseModal
        open={editTarget !== null}
        onOpenChange={(open) => !open && setEditTarget(null)}
        expense={editTarget ?? undefined}
      />

      <DeleteExpenseDialog expense={deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} />
    </div>
  )
}
