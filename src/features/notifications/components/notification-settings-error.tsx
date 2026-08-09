import { SectionError } from '@/components/common/section-error'

interface NotificationSettingsErrorProps {
  onRetry: () => void
}

export function NotificationSettingsError({ onRetry }: NotificationSettingsErrorProps) {
  return <SectionError message="Unable to load notification settings. Please try again." onRetry={onRetry} />
}
