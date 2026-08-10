import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DeleteRecurringExpenseDialog } from '@/features/recurring-expenses/components/delete-recurring-expense-dialog'
import { PauseRecurringExpenseDialog } from '@/features/recurring-expenses/components/pause-recurring-expense-dialog'
import { RecurringExpenseFilters } from '@/features/recurring-expenses/components/recurring-expense-filters'
import { RecurringExpenseForm } from '@/features/recurring-expenses/components/recurring-expense-form'
import { RecurringExpenseList } from '@/features/recurring-expenses/components/recurring-expense-list'
import { RecurringExpenseSearch } from '@/features/recurring-expenses/components/recurring-expense-search'
import { RunNowDialog } from '@/features/recurring-expenses/components/run-now-dialog'
import { useRecurringExpenseFilters } from '@/features/recurring-expenses/hooks/use-recurring-expense-filters'
import type { RecurringExpense } from '@/features/recurring-expenses/types'

const routeApi = getRouteApi('/_app/recurring-expenses')

interface PauseResumeTarget {
  recurringExpense: RecurringExpense
  action: 'pause' | 'resume'
}

export function RecurringExpensesPage() {
  const { create } = routeApi.useSearch()
  const filters = useRecurringExpenseFilters()

  const [formOpen, setFormOpen] = useState(Boolean(create))
  const [editTarget, setEditTarget] = useState<RecurringExpense | null>(null)
  const [pauseResumeTarget, setPauseResumeTarget] = useState<PauseResumeTarget | null>(null)
  const [runNowTarget, setRunNowTarget] = useState<RecurringExpense | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<RecurringExpense | null>(null)

  function openCreateForm() {
    setEditTarget(null)
    setFormOpen(true)
  }

  function openEditForm(recurringExpense: RecurringExpense) {
    setEditTarget(recurringExpense)
    setFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Recurring Expenses</h1>
          <p className="text-sm text-muted-foreground">
            Manage expenses that repeat automatically or remind you when they're due.
          </p>
        </div>
        <Button onClick={openCreateForm} className="w-full sm:w-auto">
          <Plus />
          New Recurring Expense
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <RecurringExpenseSearch key={filters.resetKey} value={filters.search} onChange={filters.setSearch} />
        <RecurringExpenseFilters
          status={filters.status}
          onStatusChange={filters.setStatus}
          frequency={filters.frequency}
          onFrequencyChange={filters.setFrequency}
          generationMode={filters.generationMode}
          onGenerationModeChange={filters.setGenerationMode}
        />
      </div>

      <RecurringExpenseList
        params={filters.params}
        hasActiveFilters={filters.hasActiveFilters}
        onCreate={openCreateForm}
        onClearFilters={filters.clearFilters}
        onEdit={openEditForm}
        onPause={(recurringExpense) => setPauseResumeTarget({ recurringExpense, action: 'pause' })}
        onResume={(recurringExpense) => setPauseResumeTarget({ recurringExpense, action: 'resume' })}
        onRunNow={setRunNowTarget}
        onDelete={setDeleteTarget}
      />

      <RecurringExpenseForm open={formOpen} onOpenChange={setFormOpen} recurringExpense={editTarget ?? undefined} />

      <PauseRecurringExpenseDialog
        recurringExpense={pauseResumeTarget?.recurringExpense ?? null}
        action={pauseResumeTarget?.action ?? 'pause'}
        onOpenChange={(open) => !open && setPauseResumeTarget(null)}
      />

      <RunNowDialog recurringExpense={runNowTarget} onOpenChange={(open) => !open && setRunNowTarget(null)} />

      <DeleteRecurringExpenseDialog
        recurringExpense={deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  )
}
