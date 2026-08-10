import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordField } from '@/features/settings/components/password-field'
import { useDeleteAccountMutation } from '@/features/settings/hooks/use-user-mutations'
import { deleteAccountSchema, type DeleteAccountFormValues } from '@/features/settings/schemas/delete-account.schema'

const DELETE_CONFIRMATION_WORD = 'DELETE'

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountDialog({ open, onOpenChange }: DeleteAccountDialogProps) {
  const navigate = useNavigate()
  const deleteAccountMutation = useDeleteAccountMutation()
  const [step, setStep] = useState<'password' | 'confirm'>('password')
  const [confirmationText, setConfirmationText] = useState('')

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    mode: 'onChange',
    defaultValues: { currentPassword: '' },
  })

  function reset() {
    form.reset()
    setStep('password')
    setConfirmationText('')
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset()
    onOpenChange(next)
  }

  async function handleContinue() {
    const valid = await form.trigger('currentPassword')
    if (valid) setStep('confirm')
  }

  function onSubmit(values: DeleteAccountFormValues) {
    deleteAccountMutation.mutate(
      { current_password: values.currentPassword },
      {
        onSuccess: () => {
          onOpenChange(false)
          navigate({ to: '/' })
        },
      },
    )
  }

  const isPending = deleteAccountMutation.isPending

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        {step === 'password' ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting your account permanently removes your account and associated data. This action cannot be
                undone. Before deleting, we'll email a copy of your expense data to your registered email address.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Form {...form}>
              <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                <PasswordField
                  control={form.control}
                  name="currentPassword"
                  label="Confirm your password"
                  autoComplete="current-password"
                />
              </form>
            </Form>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                variant="destructive"
                onClick={(event) => {
                  event.preventDefault()
                  void handleContinue()
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
                This is your last chance to back out. We'll email a copy of your expense data, then permanently
                delete your account. Type <span className="font-semibold text-foreground">{DELETE_CONFIRMATION_WORD}</span>{' '}
                below to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2">
              <Label htmlFor="delete-account-confirm">Type {DELETE_CONFIRMATION_WORD} to confirm</Label>
              <Input
                id="delete-account-confirm"
                autoComplete="off"
                value={confirmationText}
                disabled={isPending}
                onChange={(event) => setConfirmationText(event.target.value)}
              />
            </div>

            <AlertDialogFooter>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => setStep('password')}>
                Back
              </Button>
              <AlertDialogAction
                type="button"
                variant="destructive"
                disabled={isPending || confirmationText !== DELETE_CONFIRMATION_WORD}
                onClick={(event) => {
                  event.preventDefault()
                  form.handleSubmit(onSubmit)()
                }}
              >
                {isPending ? 'Deleting...' : 'Delete Account'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
