import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useUnlockUserMutation } from '@/features/admin/hooks/use-admin-user-mutations'
import type { AdminUserResponse } from '@/features/admin/types'

interface UnlockUserDialogProps {
  user: AdminUserResponse | null
  onOpenChange: (open: boolean) => void
}

export function UnlockUserDialog({ user, onOpenChange }: UnlockUserDialogProps) {
  const unlockMutation = useUnlockUserMutation()

  function handleUnlock() {
    if (!user) return
    unlockMutation.mutate(user.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unlock account</AlertDialogTitle>
          <AlertDialogDescription>
            This clears the failed-login lockout on <span className="font-medium text-foreground">{user?.username}</span>'s
            account, letting them sign in again immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUnlock}>Unlock</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
