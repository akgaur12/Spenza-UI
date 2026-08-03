import { Loader2 } from 'lucide-react'

export function LoadingMoreIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      Loading more…
    </div>
  )
}
