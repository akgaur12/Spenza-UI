import { Skeleton } from '@/components/ui/skeleton'

function ExpenseRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 sm:px-0">
      <Skeleton className="size-9 shrink-0 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-5 w-14" />
    </div>
  )
}

export function ExpenseSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }, (_, groupIndex) => (
        <div key={groupIndex}>
          <div className="flex items-center justify-between px-4 py-2 sm:px-0">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 2 }, (_, rowIndex) => (
              <ExpenseRowSkeleton key={rowIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
