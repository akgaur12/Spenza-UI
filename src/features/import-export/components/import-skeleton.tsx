import { Skeleton } from '@/components/ui/skeleton'

/** Mimics PreviewTable's row shape so swapping in the real data causes no layout shift. */
export function ImportSkeleton() {
  return (
    <div className="space-y-2 rounded-lg border p-3">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-8 w-full rounded-md" />
      ))}
    </div>
  )
}
