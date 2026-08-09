import type { NotificationType } from '@/features/notifications/types'
import { notificationTypeLabel } from '@/features/notifications/utils/notification-type-map'

export interface NotificationPreferenceMetadata {
  title: string
  description: string
}

/** Known-type → { title, description } for the Notification Settings list. Anything not listed
 * here (including future backend types) falls back to a generic description in
 * `getNotificationPreferenceMetadata` — a new type must never break this page. */
const NOTIFICATION_PREFERENCE_METADATA: Partial<Record<NotificationType, NotificationPreferenceMetadata>> = {
  welcome: {
    title: 'Welcome',
    description: 'Receive welcome notifications from Spenza.',
  },
  report_ready: {
    title: 'Expense Reports',
    description: 'Receive a notification when your expense report is ready.',
  },
  recurring_expense_created: {
    title: 'Recurring Expense',
    description: 'Receive a notification when a recurring expense is automatically created.',
  },
  password_changed: {
    title: 'Password Changed',
    description: 'Receive a security notification when your password is changed.',
  },
  system: {
    title: 'System Notifications',
    description: 'Receive important system notifications from Spenza.',
  },
  ai_insight: {
    title: 'AI Insights',
    description: 'Receive a notification when a new AI-generated spending insight is available.',
  },
  security_alert: {
    title: 'Security Alerts',
    description: 'Receive a notification about important security events on your account.',
  },
  subscription_expiring: {
    title: 'Subscription Expiring',
    description: 'Receive a notification before your subscription expires.',
  },
  budget_alert: {
    title: 'Budget Alerts',
    description: 'Receive a notification when you approach or exceed a budget.',
  },
  weekly_summary: {
    title: 'Weekly Summary',
    description: 'Receive a weekly summary of your spending.',
  },
}

export function getNotificationPreferenceMetadata(type: NotificationType): NotificationPreferenceMetadata {
  return (
    NOTIFICATION_PREFERENCE_METADATA[type] ?? {
      title: notificationTypeLabel(type),
      description: 'Receive updates and notifications from Spenza.',
    }
  )
}
