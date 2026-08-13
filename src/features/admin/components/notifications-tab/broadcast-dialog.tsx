import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useBroadcastNotificationMutation } from '@/features/admin/hooks/use-broadcast-notification-mutation'
import {
  broadcastNotificationFormSchema,
  type BroadcastNotificationFormValues,
} from '@/features/admin/schemas/broadcast-notification.schema'
import type { AdminUserResponse } from '@/features/admin/types'

interface BroadcastDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** When set, the notification targets only this user instead of every active, verified user. */
  targetUser?: AdminUserResponse | null
}

export function BroadcastDialog({ open, onOpenChange, targetUser }: BroadcastDialogProps) {
  const broadcastMutation = useBroadcastNotificationMutation()

  const form = useForm<BroadcastNotificationFormValues>({
    resolver: zodResolver(broadcastNotificationFormSchema),
    defaultValues: { title: '', message: '', priority: 'normal' },
  })

  useEffect(() => {
    if (open) form.reset({ title: '', message: '', priority: 'normal' })
  }, [open, form])

  async function onSubmit(values: BroadcastNotificationFormValues) {
    await broadcastMutation.mutateAsync({
      title: values.title,
      message: values.message,
      priority: values.priority,
      user_ids: targetUser ? [targetUser.id] : undefined,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{targetUser ? `Notify ${targetUser.username}` : 'Broadcast notification'}</DialogTitle>
          <DialogDescription>
            {targetUser
              ? 'Sends an in-app and email notification to this user, subject to their own notification preferences.'
              : 'Sends to every active, verified user, subject to each recipient’s own notification preferences.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Scheduled maintenance" autoFocus {...field} />
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
                    <Textarea
                      placeholder="Spenza will be briefly unavailable tonight at 11 PM IST."
                      className="min-h-48 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <LoadingButton type="submit" isLoading={broadcastMutation.isPending} loadingText="Sending…">
                Send
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
