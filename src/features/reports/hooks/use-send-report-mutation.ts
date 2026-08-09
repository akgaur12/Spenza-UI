import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sendReportNow } from '@/features/reports/api/reports.api'
import type { ReportRequest } from '@/features/reports/types'
import { notificationsKeys } from '@/features/notifications/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'

export function useSendReportMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: ReportRequest) => sendReportNow(request),
    onSuccess: ({ sent_to }) => {
      toast.success('Report sent successfully', { description: `Delivered to ${sent_to}` })
      // The backend also creates a REPORT_READY notification as a side effect of this
      // call — refetch now instead of waiting for the bell's next poll interval.
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all })
    },
    onError: (error) => {
      toast.error('The report could not be sent by email', {
        description: getErrorMessage(error, 'Please try again.'),
      })
    },
  })
}
