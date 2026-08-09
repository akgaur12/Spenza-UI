import { useEffect } from 'react'
import { useNotificationPreferences } from '@/features/notifications/hooks/use-notification-preferences'
import { useUpdateNotificationPreferenceMutation } from '@/features/notifications/hooks/use-update-notification-preference-mutation'
import type { NotificationType } from '@/features/notifications/types'

/** Types that warrant email on by default, unlike the backend's generic (email-off) default for
 * every other type: password changes are security-sensitive, and scheduled expense reports are
 * the kind of thing people expect to land in their inbox rather than only the in-app bell.
 * Reconciled the first time preferences load, and only while the row is still untouched
 * (`is_default`), so an explicit user choice always wins. */
const EMAIL_DEFAULT_TYPES: NotificationType[] = ['password_changed', 'report_ready']

/** Mount exactly once (at the Notification Settings page root) — it upgrades the types that need
 * a friendlier default than the backend's generic one, not something every list rendering the
 * same cached data should each try to do. */
export function useEnsureNotificationDefaults() {
  const query = useNotificationPreferences()
  const updateMutation = useUpdateNotificationPreferenceMutation()

  useEffect(() => {
    for (const type of EMAIL_DEFAULT_TYPES) {
      const preference = query.data?.items.find((item) => item.notification_type === type)
      if (preference?.is_default && !preference.email_enabled) {
        updateMutation.mutate({ notificationType: type, payload: { email_enabled: true } })
      }
    }
    // Only re-run when the fetched data itself changes, not on every mutation-triggered render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])
}
