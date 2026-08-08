import { BellOff } from 'lucide-react'

interface NotificationEmptyStateProps {
  variant: 'all' | 'unread'
}

export function NotificationEmptyState({ variant }: NotificationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-12 text-center sm:py-20">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <BellOff className="size-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">You're all caught up.</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {variant === 'unread' ? 'There are no unread notifications.' : "You don't have any notifications yet."}
        </p>
      </div>
    </div>
  )
}
