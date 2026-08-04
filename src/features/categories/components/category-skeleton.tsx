import { Skeleton } from '@/components/ui/skeleton'

function CategoryCardSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3.5 w-12" />
      </div>
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 2 }, (_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, cardIndex) => (
              <CategoryCardSkeleton key={cardIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
