import type { ReactNode } from 'react'
import { SectionError } from '@/components/common/section-error'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ChartWrapperProps {
  title: string
  action?: ReactNode
  isPending: boolean
  isError: boolean
  onRetry: () => void
  errorMessage?: string
  isEmpty?: boolean
  emptyMessage?: string
  skeleton: ReactNode
  children: ReactNode
  /** Rendered as a CardFooter, but only once there's real content to act on. */
  footer?: ReactNode
  /** Keeps title + action on one row even on mobile — for a short title paired with a compact action (e.g. tabs). */
  compactHeader?: boolean
}

/** Shared Card + loading/error/empty scaffolding for every Analytics chart — one widget failing never blocks the rest of the page. */
export function ChartWrapper({
  title,
  action,
  isPending,
  isError,
  onRetry,
  errorMessage = 'Unable to load this section.',
  isEmpty,
  emptyMessage = 'No data for this range yet.',
  skeleton,
  children,
  footer,
  compactHeader,
}: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader
        className={cn(
          'flex items-center justify-between gap-3',
          compactHeader ? 'flex-row' : 'flex-col items-start sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <CardTitle className={cn(compactHeader && 'shrink-0')}>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        {isPending ? (
          skeleton
        ) : isError ? (
          <SectionError message={errorMessage} onRetry={onRetry} />
        ) : isEmpty ? (
          <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          children
        )}
      </CardContent>
      {footer && !isPending && !isError && !isEmpty && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
