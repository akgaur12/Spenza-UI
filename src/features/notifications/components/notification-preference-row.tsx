import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useUpdateNotificationPreferenceMutation } from '@/features/notifications/hooks/use-update-notification-preference-mutation'
import type { NotificationPreference, NotificationPreferenceUpdateRequest } from '@/features/notifications/types'
import { notificationTypeLabel } from '@/features/notifications/utils/notification-type-map'

interface NotificationPreferenceRowProps {
  preference: NotificationPreference
}

export function NotificationPreferenceRow({ preference }: NotificationPreferenceRowProps) {
  const updateMutation = useUpdateNotificationPreferenceMutation()

  function update(payload: NotificationPreferenceUpdateRequest) {
    updateMutation.mutate({ notificationType: preference.notification_type, payload })
  }

  const id = `notification-pref-${preference.notification_type}`

  return (
    <div className="space-y-3 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={`${id}-enabled`} className="text-sm font-medium">
          {notificationTypeLabel(preference.notification_type)}
        </Label>
        <Switch id={`${id}-enabled`} checked={preference.enabled} onCheckedChange={(checked) => update({ enabled: checked })} />
      </div>

      <div className="flex items-center justify-between gap-4 pl-1">
        <Label htmlFor={`${id}-in-app`} className="text-sm font-normal text-muted-foreground">
          In-App
        </Label>
        <Switch
          id={`${id}-in-app`}
          checked={preference.in_app_enabled}
          disabled={!preference.enabled}
          onCheckedChange={(checked) => update({ in_app_enabled: checked })}
        />
      </div>

      <div className="flex items-center justify-between gap-4 pl-1">
        <Label htmlFor={`${id}-email`} className="text-sm font-normal text-muted-foreground">
          Email
        </Label>
        <Switch
          id={`${id}-email`}
          checked={preference.email_enabled}
          disabled={!preference.enabled}
          onCheckedChange={(checked) => update({ email_enabled: checked })}
        />
      </div>
    </div>
  )
}
