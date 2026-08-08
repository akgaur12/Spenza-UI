import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { NotificationFilter } from '@/features/notifications/hooks/use-notification-filters'

interface NotificationFiltersProps {
  value: NotificationFilter
  onChange: (value: NotificationFilter) => void
}

export function NotificationFilters({ value, onChange }: NotificationFiltersProps) {
  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as NotificationFilter)}>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
