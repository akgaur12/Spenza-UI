import { useEffect } from 'react'
import { SectionError } from '@/components/common/section-error'
import { EmptyRecurringExpenses } from '@/features/recurring-expenses/components/empty-recurring-expenses'
import { NoResultsRecurringExpenses } from '@/features/recurring-expenses/components/no-results-recurring-expenses'
import { RecurringExpenseCard } from '@/features/recurring-expenses/components/recurring-expense-card'
import { RecurringExpenseSkeleton } from '@/features/recurring-expenses/components/recurring-expense-skeleton'
import { useInfiniteRecurringExpenses } from '@/features/recurring-expenses/hooks/use-infinite-recurring-expenses'
import type { RecurringExpense, RecurringExpenseInfiniteParams } from '@/features/recurring-expenses/types'
import { useInView } from '@/hooks/use-in-view'
import { LoadingMoreIndicator } from '@/features/expenses/components/loading-more-indicator'
import { cn } from '@/lib/utils'

interface RecurringExpenseListProps {
  params: RecurringExpenseInfiniteParams
  hasActiveFilters: boolean
  onCreate: () => void
  onClearFilters: () => void
  onEdit: (recurringExpense: RecurringExpense) => void
  onPause: (recurringExpense: RecurringExpense) => void
  onResume: (recurringExpense: RecurringExpense) => void
  onRunNow: (recurringExpense: RecurringExpense) => void
  onDelete: (recurringExpense: RecurringExpense) => void
}

export function RecurringExpenseList({
  params,
  hasActiveFilters,
  onCreate,
  onClearFilters,
  onEdit,
  onPause,
  onResume,
  onRunNow,
  onDelete,
}: RecurringExpenseListProps) {
  const query = useInfiniteRecurringExpenses(params)
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query
  const { ref: sentinelRef, isInView } = useInView<HTMLDivElement>('300px')

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (query.isPending) return <RecurringExpenseSkeleton />

  if (query.isError) {
    return <SectionError message="Unable to load recurring expenses." onRetry={() => query.refetch()} />
  }

  const total = query.data.pages[0]?.total ?? 0

  if (total === 0) {
    return hasActiveFilters ? (
      <NoResultsRecurringExpenses onClearFilters={onClearFilters} />
    ) : (
      <EmptyRecurringExpenses onCreate={onCreate} />
    )
  }

  const items = query.data.pages.flatMap((page) => page.items)

  return (
    <div className={cn('space-y-4 transition-opacity', query.isPlaceholderData && 'opacity-60')}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((recurringExpense) => (
          <RecurringExpenseCard
            key={recurringExpense.id}
            recurringExpense={recurringExpense}
            onEdit={onEdit}
            onPause={onPause}
            onResume={onResume}
            onRunNow={onRunNow}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden />
      {query.isFetchingNextPage && <LoadingMoreIndicator />}
    </div>
  )
}
