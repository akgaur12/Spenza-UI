import { Laptop } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useRevokeUserSessionsMutation } from '@/features/admin/hooks/use-revoke-user-sessions-mutation'
import { useUserSessions } from '@/features/admin/hooks/use-user-sessions'
import type { AdminUserResponse } from '@/features/admin/types'
import { formatExpenseTableDate, formatRelativeTime } from '@/lib/format'

interface UserSessionsDialogProps {
  user: AdminUserResponse | null
  onOpenChange: (open: boolean) => void
}

export function UserSessionsDialog({ user, onOpenChange }: UserSessionsDialogProps) {
  const { data, isLoading } = useUserSessions(user?.id ?? null)
  const revokeMutation = useRevokeUserSessionsMutation()

  return (
    <Dialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Active sessions</DialogTitle>
          <DialogDescription>
            Devices currently signed in as <span className="font-medium text-foreground">{user?.username}</span>.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {data.items.map((session) => (
              <div key={session.id} className="flex items-start gap-3 rounded-md border border-border px-3 py-2">
                <Laptop className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium text-foreground">{session.device ?? 'Unknown device'}</p>
                  <p className="text-xs text-muted-foreground">{session.ip_address ?? 'Unknown IP'}</p>
                  <p className="text-xs text-muted-foreground">
                    Signed in {formatExpenseTableDate(session.created_at)}
                    {session.last_used_at && ` · last used ${formatRelativeTime(session.last_used_at)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">No active sessions.</p>
        )}

        {data && data.items.length > 0 && (
          <LoadingButton
            variant="destructive"
            isLoading={revokeMutation.isPending}
            loadingText="Signing out…"
            onClick={() => user && revokeMutation.mutate(user.id)}
          >
            Sign out everywhere
          </LoadingButton>
        )}
      </DialogContent>
    </Dialog>
  )
}
