import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  label: string
}

/** Small centered spinner + label — used for opaque, byte-less operations (confirm import, export prep). */
export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
