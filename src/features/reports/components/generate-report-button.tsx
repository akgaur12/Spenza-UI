import { Download } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'

interface GenerateReportButtonProps {
  isLoading: boolean
  disabled?: boolean
  onClick: () => void
  className?: string
}

export function GenerateReportButton({ isLoading, disabled, onClick, className }: GenerateReportButtonProps) {
  return (
    <LoadingButton
      type="button"
      size="lg"
      className={className}
      isLoading={isLoading}
      loadingText="Generating report…"
      disabled={disabled}
      onClick={onClick}
    >
      <Download />
      Generate PDF
    </LoadingButton>
  )
}
