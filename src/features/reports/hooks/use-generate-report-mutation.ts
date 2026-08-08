import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { generateReport } from '@/features/reports/api/reports.api'
import type { ReportPeriod, ReportRequest, ResolvedReportRange } from '@/features/reports/types'
import { fallbackReportFilename } from '@/features/reports/utils/report-date-range'
import { downloadBlob } from '@/lib/download'
import { getErrorMessage } from '@/lib/errors'

interface GenerateReportVariables {
  request: ReportRequest
  period: ReportPeriod
  resolved: ResolvedReportRange
}

export function useGenerateReportMutation() {
  return useMutation({
    mutationFn: ({ request }: GenerateReportVariables) => generateReport(request),
    onSuccess: ({ blob, fileName }, { period, resolved }) => {
      downloadBlob(blob, fileName ?? fallbackReportFilename(period, resolved))
      toast.success('Report downloaded')
    },
    onError: (error) => {
      toast.error('Unable to generate the report', {
        description: getErrorMessage(error, 'Please try again.'),
      })
    },
  })
}
