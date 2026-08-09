import type { Notification } from '@/features/notifications/types'

export interface NotificationAction {
  to: string
}

/** notification type + payload → destination. Unknown/unactionable types resolve to `null`,
 * meaning the click should just mark the notification as read without navigating anywhere. */
export function resolveNotificationAction(notification: Notification): NotificationAction | null {
  switch (notification.type) {
    case 'report_ready':
      return { to: '/reports' }
    case 'recurring_expense_created':
      return { to: '/expenses' }
    default:
      return null
  }
}
