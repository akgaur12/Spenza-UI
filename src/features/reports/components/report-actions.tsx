import { GenerateReportButton } from '@/features/reports/components/generate-report-button'
import { SendReportButton } from '@/features/reports/components/send-report-button'
import { useGenerateReportMutation } from '@/features/reports/hooks/use-generate-report-mutation'
import { useSendReportMutation } from '@/features/reports/hooks/use-send-report-mutation'
import type { ReportPeriod, ReportRequest, ResolvedReportRange } from '@/features/reports/types'

interface ReportActionsProps {
  request: ReportRequest
  period: ReportPeriod
  resolved: ResolvedReportRange
  disabled: boolean
}

/** Owns both mutations so the two actions can disable each other — generating and emailing the
 * same period at once would just race the same backend pipeline for no benefit. */
export function ReportActions({ request, period, resolved, disabled }: ReportActionsProps) {
  const generateMutation = useGenerateReportMutation()
  const sendMutation = useSendReportMutation()
  const busy = generateMutation.isPending || sendMutation.isPending

  return (
    <div className="flex flex-row gap-2">
      <GenerateReportButton
        isLoading={generateMutation.isPending}
        disabled={disabled || busy}
        onClick={() => generateMutation.mutate({ request, period, resolved })}
        className="flex-1"
      />
      <SendReportButton
        isLoading={sendMutation.isPending}
        disabled={disabled || busy}
        onClick={() => sendMutation.mutate(request)}
        className="flex-1"
      />
    </div>
  )
}
