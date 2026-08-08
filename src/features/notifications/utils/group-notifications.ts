import { isToday } from 'date-fns'
import type { Notification } from '@/features/notifications/types'

export interface NotificationGroup {
  label: 'Today' | 'Earlier'
  items: Notification[]
}

/** Two buckets only, matching the Notification Center's mockup — not a full date-group timeline. */
export function groupNotificationsByDay(notifications: Notification[]): NotificationGroup[] {
  const today: Notification[] = []
  const earlier: Notification[] = []

  for (const notification of notifications) {
    if (isToday(new Date(notification.created_at))) today.push(notification)
    else earlier.push(notification)
  }

  const groups: NotificationGroup[] = []
  if (today.length) groups.push({ label: 'Today', items: today })
  if (earlier.length) groups.push({ label: 'Earlier', items: earlier })
  return groups
}
