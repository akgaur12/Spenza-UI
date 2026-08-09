import { NotificationPreferenceRow } from '@/features/notifications/components/notification-preference-row'
import { NotificationSettingsError } from '@/features/notifications/components/notification-settings-error'
import { NotificationSettingsSkeleton } from '@/features/notifications/components/notification-settings-skeleton'
import { useNotificationPreferences } from '@/features/notifications/hooks/use-notification-preferences'
import type { NotificationType } from '@/features/notifications/types'

interface NotificationPreferencesProps {
  /** Only rows whose type passes this predicate are rendered — lets separate sections (general
   * list vs. Scheduled Reports) share the same cached query without duplicating fetch logic. */
  filter: (type: NotificationType) => boolean
  emptyMessage?: string
}

export function NotificationPreferences({ filter, emptyMessage }: NotificationPreferencesProps) {
  const query = useNotificationPreferences()

  if (query.isPending) return <NotificationSettingsSkeleton />

  if (query.isError) {
    return <NotificationSettingsError onRetry={() => query.refetch()} />
  }

  const items = query.data.items.filter((preference) => filter(preference.notification_type))

  if (items.length === 0) {
    return emptyMessage ? <p className="text-sm text-muted-foreground">{emptyMessage}</p> : null
  }

  return (
    <div className="divide-y divide-border">
      {items.map((preference) => (
        <NotificationPreferenceRow key={preference.notification_type} preference={preference} />
      ))}
    </div>
  )
}
