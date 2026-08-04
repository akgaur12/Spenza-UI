import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
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
import { Form } from '@/components/ui/form'
import { PasswordField } from '@/features/settings/components/password-field'
import { useDeleteAccountMutation } from '@/features/settings/hooks/use-user-mutations'
import { deleteAccountSchema, type DeleteAccountFormValues } from '@/features/settings/schemas/delete-account.schema'

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountDialog({ open, onOpenChange }: DeleteAccountDialogProps) {
  const navigate = useNavigate()
  const deleteAccountMutation = useDeleteAccountMutation()

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    mode: 'onChange',
    defaultValues: { currentPassword: '' },
  })

  function handleOpenChange(next: boolean) {
    if (!next) form.reset()
    onOpenChange(next)
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

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you absolutely sure? Deleting your account permanently removes your account and associated data.
            This action cannot be undone.
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
          <AlertDialogCancel disabled={deleteAccountMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            variant="destructive"
            disabled={deleteAccountMutation.isPending}
            onClick={(event) => {
              // AlertDialogAction closes on click by default — prevent that so we can
              // validate/submit first and only close once the mutation succeeds.
              event.preventDefault()
              form.handleSubmit(onSubmit)()
            }}
          >
            {deleteAccountMutation.isPending ? 'Deleting...' : 'Delete Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
