import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sendAdminEmail } from '@/features/admin/api/admin-email.api'
import { getErrorMessage } from '@/lib/errors'

/**
 * Delivery success/failure is per-recipient, not a single pass/fail — the
 * result is reported via `onSuccess` with counts rather than treated as a
 * mutation failure, matching how the backend itself never raises on a
 * partial or total delivery failure.
 */
export function useSendAdminEmailMutation() {
  return useMutation({
    mutationFn: sendAdminEmail,
    onSuccess: (result) => {
      if (result.unknown_user_ids.length > 0) {
        toast.warning('Some recipients were not found', {
          description: `${result.unknown_user_ids.length} user ID${result.unknown_user_ids.length === 1 ? '' : 's'} no longer exist.`,
        })
      }
      if (result.failed > 0) {
        toast.error('Email partially delivered', {
          description: `Sent to ${result.sent} of ${result.targeted}, ${result.failed} failed.`,
        })
      } else {
        toast.success('Email sent', { description: `Delivered to ${result.sent} of ${result.targeted} recipients.` })
      }
    },
    onError: (error) => {
      toast.error('Could not send email', { description: getErrorMessage(error) })
    },
  })
}
