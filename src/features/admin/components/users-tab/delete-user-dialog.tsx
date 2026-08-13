import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDeleteUserMutation } from '@/features/admin/hooks/use-admin-user-mutations'
import type { AdminUserResponse } from '@/features/admin/types'

const DELETE_CONFIRMATION_WORD = 'DELETE'

interface DeleteUserDialogProps {
  user: AdminUserResponse | null
  onOpenChange: (open: boolean) => void
}

export function DeleteUserDialog({ user, onOpenChange }: DeleteUserDialogProps) {
  const deleteMutation = useDeleteUserMutation()
  const [step, setStep] = useState<'notice' | 'confirm'>('notice')
  const [confirmationText, setConfirmationText] = useState('')

  function reset() {
    setStep('notice')
    setConfirmationText('')
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset()
    onOpenChange(next)
  }

  function handleDelete() {
    if (!user) return
    deleteMutation.mutate(user.id)
    handleOpenChange(false)
  }

  const isPending = deleteMutation.isPending

  return (
    <AlertDialog open={Boolean(user)} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        {step === 'notice' ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete user</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{user?.username}</p>
                  <p>
                    This permanently deletes this account and all their data. Before deleting, the system will
                    automatically email them a full export of their expense data — they will be notified of this
                    deletion.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <AlertDialogAction
                type="button"
                variant="destructive"
                onClick={(event) => {
                  event.preventDefault()
                  setStep('confirm')
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This is the last chance to back out. Type{' '}
                <span className="font-semibold text-foreground">{DELETE_CONFIRMATION_WORD}</span> below to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2">
              <Label htmlFor="delete-user-confirm">Type {DELETE_CONFIRMATION_WORD} to confirm</Label>
              <Input
                id="delete-user-confirm"
                autoComplete="off"
                value={confirmationText}
                disabled={isPending}
                onChange={(event) => setConfirmationText(event.target.value)}
              />
            </div>

            <AlertDialogFooter>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => setStep('notice')}>
                Back
              </Button>
              <AlertDialogAction
                type="button"
                variant="destructive"
                disabled={isPending || confirmationText !== DELETE_CONFIRMATION_WORD}
                onClick={(event) => {
                  event.preventDefault()
                  handleDelete()
                }}
              >
                {isPending ? 'Deleting...' : 'Delete User'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
