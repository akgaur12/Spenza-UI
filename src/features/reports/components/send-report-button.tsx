import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@/components/common/loading-button'

interface SendReportButtonProps {
  isLoading: boolean
  disabled?: boolean
  onClick: () => void
  className?: string
}

/** The backend does "generate, then email" as one request/response — the two-phase label below is
 * a purely cosmetic sequence (not a real progress event) that mirrors what's actually happening. */
export function SendReportButton({ isLoading, disabled, onClick, className }: SendReportButtonProps) {
  const [label, setLabel] = useState('Preparing report…')

  useEffect(() => {
    if (!isLoading) {
      setLabel('Preparing report…')
      return
    }
    const timer = setTimeout(() => setLabel('Sending email…'), 900)
    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <LoadingButton
      type="button"
      variant="outline"
      className={className}
      isLoading={isLoading}
      loadingText={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Mail />
      Send by Email
    </LoadingButton>
  )
}
