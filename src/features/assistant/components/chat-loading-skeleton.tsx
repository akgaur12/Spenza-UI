import { Skeleton } from '@/components/ui/skeleton'

export function ChatMessagesSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <Skeleton className="h-9 w-2/3 rounded-2xl" />
      </div>
      <div className="flex gap-2.5">
        <Skeleton className="size-6 shrink-0 rounded-full" />
        <Skeleton className="h-16 w-3/4 rounded-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-1/2 rounded-2xl" />
      </div>
    </div>
  )
}

export function ChatListSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-2">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-9 w-full rounded-md" />
      ))}
    </div>
  )
}
