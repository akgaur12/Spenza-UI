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
import { useUpdateUserRoleMutation } from '@/features/admin/hooks/use-admin-user-mutations'
import type { AdminUserResponse } from '@/features/admin/types'

interface ChangeRoleDialogProps {
  user: AdminUserResponse | null
  onOpenChange: (open: boolean) => void
}

export function ChangeRoleDialog({ user, onOpenChange }: ChangeRoleDialogProps) {
  const updateRoleMutation = useUpdateUserRoleMutation()
  const promoting = user?.role === 'user'

  function handleConfirm() {
    if (!user) return
    updateRoleMutation.mutate({ userId: user.id, payload: { role: promoting ? 'admin' : 'user' } })
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{promoting ? 'Promote to admin' : 'Demote to regular user'}</AlertDialogTitle>
          <AlertDialogDescription>
            {promoting ? (
              <>
                <span className="font-medium text-foreground">{user?.username}</span> will gain full access to this
                admin panel — user management, system categories, notifications, and email tools.
              </>
            ) : (
              <>
                <span className="font-medium text-foreground">{user?.username}</span> will immediately lose admin
                access. This only affects the admin API — it won't sign them out or lock their account.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{promoting ? 'Promote' : 'Demote'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
