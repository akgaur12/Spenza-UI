import { Bell } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NotificationBadge } from '@/features/notifications/components/notification-badge'
import { NotificationPreviewList } from '@/features/notifications/components/notification-preview-list'
import { useUnreadNotificationCount } from '@/features/notifications/hooks/use-unread-count'
import { useMediaQuery } from '@/hooks/use-media-query'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  // A failed unread-count fetch must never keep the bell itself from rendering — default to 0.
  const unreadCountQuery = useUnreadNotificationCount()
  const count = unreadCountQuery.data?.count ?? 0

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={count > 0 ? `Notifications, ${count} unread` : 'Notifications'}
    >
      <Bell className="size-[1.1rem]" />
      <NotificationBadge count={count} />
    </Button>
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <NotificationPreviewList onClose={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <NotificationPreviewList onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
