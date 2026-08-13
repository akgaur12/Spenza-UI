import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserMultiCombobox } from '@/features/admin/components/email-tab/user-multi-combobox'
import { useAdminUsers } from '@/features/admin/hooks/use-admin-users'
import { useSendAdminEmailMutation } from '@/features/admin/hooks/use-send-admin-email-mutation'
import { sendAdminEmailFormSchema, type SendAdminEmailFormValues } from '@/features/admin/schemas/send-admin-email.schema'
import type { AdminUserResponse } from '@/features/admin/types'

interface SendAdminEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** When set, the recipient is fixed to this user instead of a picker. */
  targetUser?: AdminUserResponse | null
}

export function SendAdminEmailDialog({ open, onOpenChange, targetUser }: SendAdminEmailDialogProps) {
  const [recipientIds, setRecipientIds] = useState<string[]>([])
  const sendEmailMutation = useSendAdminEmailMutation()
  // A bounded fetch for the recipient picker — the admin users list endpoint
  // has no search-all-users support yet (max page_size is 100 backend-side),
  // which comfortably covers this app's current user base.
  const { data: userPage } = useAdminUsers({ page: 1, page_size: 100 })

  const form = useForm<SendAdminEmailFormValues>({
    resolver: zodResolver(sendAdminEmailFormSchema),
    defaultValues: { subject: '', message: '' },
  })

  useEffect(() => {
    if (open) {
      form.reset({ subject: '', message: '' })
      setRecipientIds(targetUser ? [targetUser.id] : [])
    }
  }, [open, targetUser, form])

  async function onSubmit(values: SendAdminEmailFormValues) {
    await sendEmailMutation.mutateAsync({ user_ids: recipientIds, subject: values.subject, message: values.message })
    onOpenChange(false)
  }

  const canSubmit = recipientIds.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send email</DialogTitle>
          <DialogDescription>
            {targetUser
              ? 'Delivered directly to this user, regardless of their notification preferences.'
              : 'Delivered directly to the selected users, regardless of their notification preferences.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label>To</Label>
              {targetUser ? (
                <p className="rounded-md border border-input px-3 py-2 text-sm text-foreground">
                  {targetUser.username} <span className="text-muted-foreground">&lt;{targetUser.email}&gt;</span>
                </p>
              ) : (
                <UserMultiCombobox
                  users={userPage?.items ?? []}
                  selectedIds={recipientIds}
                  onChange={setRecipientIds}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Following up on your support request" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Hi, following up on..." className="min-h-64 resize-y" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <LoadingButton type="submit" isLoading={sendEmailMutation.isPending} disabled={!canSubmit} loadingText="Sending…">
                Send
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
