import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NotificationPreferences } from '@/features/notifications/components/notification-preferences'
import { SettingsSection } from '@/features/settings/components/settings-section'

export function NotificationSettings() {
  return (
    <SettingsSection title="Notifications" description="Choose how you want to receive notifications.">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control in-app and email delivery for each notification type.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferences />
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
