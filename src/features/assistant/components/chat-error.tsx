import { Button } from '@/components/ui/button'

interface ChatErrorProps {
  message: string
  onRetry?: () => void
}

/** Never renders raw backend error detail — `message` must already be a user-safe string. */
export function ChatError({ message, onRetry }: ChatErrorProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-foreground">
      <p>{message}</p>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
