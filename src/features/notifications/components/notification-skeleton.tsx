import { Skeleton } from '@/components/ui/skeleton'

function NotificationRowSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-lg px-2 py-3">
      <Skeleton className="size-9 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}

export function NotificationSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 5 }, (_, index) => (
        <NotificationRowSkeleton key={index} />
      ))}
    </div>
  )
}
