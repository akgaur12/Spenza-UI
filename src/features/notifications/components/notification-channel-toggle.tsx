import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface NotificationChannelToggleProps {
  id: string
  label: string
  ariaLabel: string
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}

export function NotificationChannelToggle({
  id,
  label,
  ariaLabel,
  checked,
  disabled,
  onCheckedChange,
}: NotificationChannelToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">
        {label}
      </Label>
      <Switch id={id} checked={checked} disabled={disabled} aria-label={ariaLabel} onCheckedChange={onCheckedChange} />
    </div>
  )
}
