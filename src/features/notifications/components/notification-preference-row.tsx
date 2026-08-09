import { useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { NotificationChannelToggle } from '@/features/notifications/components/notification-channel-toggle'
import { NotificationIcon } from '@/features/notifications/components/notification-icon'
import { useUpdateNotificationPreferenceMutation } from '@/features/notifications/hooks/use-update-notification-preference-mutation'
import type { NotificationPreference, NotificationPreferenceUpdateRequest } from '@/features/notifications/types'
import { getNotificationPreferenceMetadata } from '@/features/notifications/utils/notification-preference-metadata'

interface NotificationPreferenceRowProps {
  preference: NotificationPreference
}

const SAVED_FEEDBACK_DURATION = 2000

export function NotificationPreferenceRow({ preference }: NotificationPreferenceRowProps) {
  const updateMutation = useUpdateNotificationPreferenceMutation()
  const [justSaved, setJustSaved] = useState(false)
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(savedTimeoutRef.current), [])

  function update(payload: NotificationPreferenceUpdateRequest) {
    updateMutation.mutate(
      { notificationType: preference.notification_type, payload },
      {
        onSuccess: () => {
          setJustSaved(true)
          clearTimeout(savedTimeoutRef.current)
          savedTimeoutRef.current = setTimeout(() => setJustSaved(false), SAVED_FEEDBACK_DURATION)
        },
      },
    )
  }

  const { title, description } = getNotificationPreferenceMetadata(preference.notification_type)
  const id = `notification-pref-${preference.notification_type}`
  // Disabling every control in the row while its own mutation is pending serializes rapid
  // clicks instead of letting overlapping PATCH requests race and land out of order.
  const channelsDisabled = !preference.enabled || updateMutation.isPending

  return (
    <div className="space-y-3 py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <NotificationIcon type={preference.notification_type} className="mt-0.5" />
          <div className="space-y-0.5">
            <Label htmlFor={`${id}-enabled`} className="text-sm font-medium">
              {title}
            </Label>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {justSaved ? 'Saved' : ''}
          </span>
          <Switch
            id={`${id}-enabled`}
            checked={preference.enabled}
            disabled={updateMutation.isPending}
            aria-label={`${preference.enabled ? 'Disable' : 'Enable'} ${title} notifications`}
            onCheckedChange={(checked) => update({ enabled: checked })}
          />
        </div>
      </div>

      {!preference.enabled && (
        <p className="pl-12 text-xs text-muted-foreground">
          This notification is turned off. Turn it back on to receive In-App or Email alerts.
        </p>
      )}

      <div className="space-y-2 pl-12">
        <NotificationChannelToggle
          id={`${id}-in-app`}
          label="In-App"
          ariaLabel={`Enable in-app notifications for ${title}`}
          checked={preference.in_app_enabled}
          disabled={channelsDisabled}
          onCheckedChange={(checked) => update({ in_app_enabled: checked })}
        />
        <NotificationChannelToggle
          id={`${id}-email`}
          label="Email"
          ariaLabel={`Enable email notifications for ${title}`}
          checked={preference.email_enabled}
          disabled={channelsDisabled}
          onCheckedChange={(checked) => update({ email_enabled: checked })}
        />
      </div>
    </div>
  )
}
