import { Bell, Menu } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { PageHeader } from '@/components/layout/page-header'
import { UserMenu } from '@/components/layout/user-menu'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  onOpenDrawer: () => void
}

export function Topbar({ onOpenDrawer }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex lg:hidden"
        aria-label="Open navigation menu"
        onClick={onOpenDrawer}
      >
        <Menu className="size-5" />
      </Button>

      <Logo className="md:hidden" size="sm" />
      <PageHeader />

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => toast('Notifications are coming soon')}
        >
          <Bell className="size-[1.1rem]" />
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}
