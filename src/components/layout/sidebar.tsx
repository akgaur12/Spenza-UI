import { ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/common/logo'
import { SidebarCollapseButton } from '@/components/layout/sidebar-collapse-button'
import { useSidebar } from '@/components/layout/sidebar-context'
import { SidebarItem } from '@/components/layout/sidebar-item'
import { NAV_ITEMS } from '@/config/navigation'
import { useIsAdmin } from '@/features/admin/hooks/use-is-admin'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar()
  const { isAdmin } = useIsAdmin()

  return (
    <aside
      className={cn(
        'hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-in-out lg:flex',
        collapsed ? 'w-[76px]' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center border-b border-sidebar-border px-4',
          collapsed && 'justify-center px-0',
        )}
      >
        <Logo iconOnly={collapsed} />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
        {isAdmin && <SidebarItem title="Admin" href="/admin" icon={ShieldCheck} collapsed={collapsed} />}
      </nav>

      <div
        className={cn(
          'flex items-center border-t border-sidebar-border p-3',
          collapsed ? 'justify-center' : 'justify-end',
        )}
      >
        <SidebarCollapseButton collapsed={collapsed} onToggle={toggleCollapsed} />
      </div>
    </aside>
  )
}
