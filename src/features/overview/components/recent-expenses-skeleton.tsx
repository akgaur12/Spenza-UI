import { Skeleton } from '@/components/ui/skeleton'

export function RecentExpensesSkeleton() {
  return (
    <ul className="divide-y divide-border">
      {Array.from({ length: 5 }, (_, index) => (
        <li key={index} className="flex items-center gap-3 px-6 py-3 sm:px-0">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-4 w-14" />
        </li>
      ))}
    </ul>
  )
}
