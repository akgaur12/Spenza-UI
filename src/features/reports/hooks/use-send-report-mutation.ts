import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sendReportNow } from '@/features/reports/api/reports.api'
import type { ReportRequest } from '@/features/reports/types'
import { getErrorMessage } from '@/lib/errors'

export function useSendReportMutation() {
  return useMutation({
    mutationFn: (request: ReportRequest) => sendReportNow(request),
    onSuccess: ({ sent_to }) => {
      toast.success('Report sent successfully', { description: `Delivered to ${sent_to}` })
    },
    onError: (error) => {
      toast.error('The report could not be sent by email', {
        description: getErrorMessage(error, 'Please try again.'),
      })
    },
  })
}
