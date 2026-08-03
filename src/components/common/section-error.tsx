import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SectionErrorProps {
  message?: string
  onRetry: () => void
}

export function SectionError({ message = 'Unable to load this section.', onRetry }: SectionErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="size-3.5" />
        Retry
      </Button>
    </div>
  )
}
