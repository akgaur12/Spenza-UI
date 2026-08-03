import { useEffect } from 'react'
import { SectionError } from '@/components/common/section-error'
import { EmptyExpenseState } from '@/features/expenses/components/empty-expense-state'
import { ExpenseCard } from '@/features/expenses/components/expense-card'
import { ExpenseDateGroup } from '@/features/expenses/components/expense-date-group'
import { ExpenseSkeleton } from '@/features/expenses/components/expense-skeleton'
import { LoadingMoreIndicator } from '@/features/expenses/components/loading-more-indicator'
import { NoResultsState } from '@/features/expenses/components/no-results-state'
import { useInfiniteExpenses } from '@/features/expenses/hooks/use-infinite-expenses'
import type { Expense, ExpenseInfiniteParams, ExpenseSortOption } from '@/features/expenses/types'
import { groupExpensesByDate, sortExpenses } from '@/features/expenses/utils/group-expenses'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface ExpenseTimelineProps {
  params: ExpenseInfiniteParams
  sort: ExpenseSortOption
  hasActiveFilters: boolean
  onAddExpense: () => void
  onClearFilters: () => void
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export function ExpenseTimeline({
  params,
  sort,
  hasActiveFilters,
  onAddExpense,
  onClearFilters,
  onEdit,
  onDelete,
}: ExpenseTimelineProps) {
  const query = useInfiniteExpenses(params)
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query
  const { ref: sentinelRef, isInView } = useInView<HTMLDivElement>('300px')

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (query.isPending) return <ExpenseSkeleton />

  if (query.isError) {
    return <SectionError message="Unable to load expenses." onRetry={() => query.refetch()} />
  }

  const total = query.data.pages[0]?.total ?? 0

  if (total === 0) {
    return hasActiveFilters ? (
      <NoResultsState onClearFilters={onClearFilters} />
    ) : (
      <EmptyExpenseState onAddExpense={onAddExpense} />
    )
  }

  const allItems = query.data.pages.flatMap((page) => page.items)
  const sorted = sortExpenses(allItems, sort)
  const groupByDate = sort === 'newest'

  return (
    <div className={cn('space-y-6 transition-opacity', query.isPlaceholderData && 'opacity-60')}>
      {groupByDate ? (
        groupExpensesByDate(sorted).map((group) => (
          <ExpenseDateGroup key={group.dateKey} group={group} onEdit={onEdit} onDelete={onDelete} />
        ))
      ) : (
        <div className="flex flex-col gap-2 px-4 sm:gap-0 sm:divide-y sm:divide-border sm:px-0">
          {sorted.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} showDate onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} aria-hidden />
      {query.isFetchingNextPage && <LoadingMoreIndicator />}
    </div>
  )
}
