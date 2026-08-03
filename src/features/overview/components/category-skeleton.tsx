import { Skeleton } from '@/components/ui/skeleton'

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <Skeleton className="size-40 shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-6 w-full" />
        ))}
      </div>
    </div>
  )
}
