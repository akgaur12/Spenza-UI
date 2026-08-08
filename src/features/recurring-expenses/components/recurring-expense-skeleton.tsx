import { Skeleton } from '@/components/ui/skeleton'

function RecurringExpenseCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/3" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-6 w-1/4" />
    </div>
  )
}

export function RecurringExpenseSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <RecurringExpenseCardSkeleton key={index} />
      ))}
    </div>
  )
}
