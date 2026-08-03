import { Skeleton } from '@/components/ui/skeleton'

function SummaryTileSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-border/70 p-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function SummarySkeleton() {
  return (
    <>
      <div className="space-y-3 sm:hidden">
        <div className="space-y-3 rounded-xl border border-border/70 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <SummaryTileSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <SummaryTileSkeleton key={index} />
        ))}
      </div>
    </>
  )
}
