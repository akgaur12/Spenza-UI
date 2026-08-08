import { useEffect } from 'react'
import { SectionError } from '@/components/common/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import { NotificationPreferenceRow } from '@/features/notifications/components/notification-preference-row'
import { useNotificationPreferences } from '@/features/notifications/hooks/use-notification-preferences'
import { useUpdateNotificationPreferenceMutation } from '@/features/notifications/hooks/use-update-notification-preference-mutation'
import type { NotificationType } from '@/features/notifications/types'

/** Not user-configurable: welcome is a one-time onboarding message, and subscription/budget/weekly-summary
 * alerts aren't sent by any feature yet — surfacing their toggles would just confuse users. */
const HIDDEN_PREFERENCE_TYPES: NotificationType[] = ['welcome', 'subscription_expiring', 'budget_alert', 'weekly_summary']

/** Security-sensitive enough to warrant email on by default, unlike the backend's generic
 * (email-off) default for every other type — reconciled here the first time preferences load,
 * and only while the row is still untouched (`is_default`), so an explicit user choice always wins. */
const SECURITY_EMAIL_DEFAULT_TYPE: NotificationType = 'password_changed'

export function NotificationPreferences() {
  const query = useNotificationPreferences()
  const updateMutation = useUpdateNotificationPreferenceMutation()

  useEffect(() => {
    const passwordChanged = query.data?.items.find((item) => item.notification_type === SECURITY_EMAIL_DEFAULT_TYPE)
    if (passwordChanged?.is_default && !passwordChanged.email_enabled) {
      updateMutation.mutate({ notificationType: SECURITY_EMAIL_DEFAULT_TYPE, payload: { email_enabled: true } })
    }
    // Only re-run when the fetched data itself changes, not on every mutation-triggered render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])

  if (query.isPending) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  if (query.isError) {
    return <SectionError message="Unable to load notification preferences." onRetry={() => query.refetch()} />
  }

  const items = query.data.items.filter((preference) => !HIDDEN_PREFERENCE_TYPES.includes(preference.notification_type))

  return (
    <div className="divide-y divide-border">
      {items.map((preference) => (
        <NotificationPreferenceRow key={preference.notification_type} preference={preference} />
      ))}
    </div>
  )
}
