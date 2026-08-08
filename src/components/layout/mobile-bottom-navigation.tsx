import { Plus } from 'lucide-react'
import { MobileNavigationItem } from '@/components/layout/mobile-navigation-item'
import { NAV_ITEMS } from '@/config/navigation'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'

// Reports intentionally isn't one of the five bottom-nav slots (reachable via the drawer/sidebar
// instead) — looked up explicitly by href rather than array position so NAV_ITEMS can grow.
const overview = NAV_ITEMS.find((item) => item.href === '/overview')!
const expenses = NAV_ITEMS.find((item) => item.href === '/expenses')!
const analytics = NAV_ITEMS.find((item) => item.href === '/analytics')!
const settings = NAV_ITEMS.find((item) => item.href === '/settings')!

export function MobileBottomNavigation() {
  const { openAddExpenseModal } = useAddExpenseModal()

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
          onClick={openAddExpenseModal}
          className="-mt-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
        >
          <Plus className="size-7" />
        </button>
      </div>

      <MobileNavigationItem title={analytics.title} href={analytics.href} icon={analytics.icon} />
      <MobileNavigationItem title={settings.title} href={settings.href} icon={settings.icon} />
    </nav>
  )
}
