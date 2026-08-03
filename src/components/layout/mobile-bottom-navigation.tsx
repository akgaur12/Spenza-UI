import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { MobileNavigationItem } from '@/components/layout/mobile-navigation-item'
import { NAV_ITEMS } from '@/config/navigation'

const [overview, expenses, analytics, profile] = NAV_ITEMS

export function MobileBottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 md:hidden"
    >
      <MobileNavigationItem title={overview.title} href={overview.href} icon={overview.icon} />
      <MobileNavigationItem title={expenses.title} href={expenses.href} icon={expenses.icon} />

      <div className="flex flex-1 items-center justify-center">
        <button
          type="button"
          aria-label="Add expense"
          onClick={() => toast('Add expense is coming soon')}
          className="-mt-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
        >
          <Plus className="size-7" />
        </button>
      </div>

      <MobileNavigationItem title={analytics.title} href={analytics.href} icon={analytics.icon} />
      <MobileNavigationItem title={profile.title} href={profile.href} icon={profile.icon} />
    </nav>
  )
}
