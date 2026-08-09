import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/auth/components/auth-provider'
import { NotificationInfoCard } from '@/features/notifications/components/notification-info-card'
import { NotificationPreferences } from '@/features/notifications/components/notification-preferences'
import { useEnsureNotificationDefaults } from '@/features/notifications/hooks/use-ensure-notification-defaults'
import { maskEmail } from '@/features/notifications/utils/mask-email'
import { SettingsSection } from '@/features/settings/components/settings-section'

/** Not user-configurable: welcome is a one-time onboarding message, and subscription/budget/weekly-summary/
 * security-alert notifications aren't sent by any feature yet — surfacing their toggles would just confuse users. */
const HIDDEN_PREFERENCE_TYPES = [
  'welcome',
  'subscription_expiring',
  'budget_alert',
  'weekly_summary',
  'security_alert',
]

/** Report emails are the one type actually driven by the backend's scheduled delivery — broken
 * out into its own section rather than mixed into the generic event-driven list. */
const SCHEDULED_REPORT_TYPE = 'report_ready'

export function NotificationSettings() {
  const { user } = useAuth()
  useEnsureNotificationDefaults()

  return (
    <SettingsSection
      title="Notification Settings"
      description="Choose how you want to receive notifications from Spenza. You can change these preferences at any time."
    >
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control in-app and email delivery for each notification type.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferences
            filter={(type) => type !== SCHEDULED_REPORT_TYPE && !HIDDEN_PREFERENCE_TYPES.includes(type)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Control delivery for the expense reports Spenza generates on a schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferences filter={(type) => type === SCHEDULED_REPORT_TYPE} />
        </CardContent>
      </Card>

      {user && (
        <NotificationInfoCard title="Email Notifications">
          <p>
            Emails will be sent to <span className="font-medium text-foreground">{maskEmail(user.email)}</span>.
          </p>
        </NotificationInfoCard>
      )}

      <NotificationInfoCard title="How notifications work">
        <p>In-App notifications appear in the notification bell at the top of Spenza.</p>
        <p>Email notifications are sent to your registered email address when enabled.</p>
      </NotificationInfoCard>
    </SettingsSection>
  )
}
