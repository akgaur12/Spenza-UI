import { createFileRoute } from '@tanstack/react-router'
import { NotificationCenterPage } from '@/features/notifications/notification-center-page'

export const Route = createFileRoute('/_app/notifications')({
  component: NotificationCenterPage,
})
