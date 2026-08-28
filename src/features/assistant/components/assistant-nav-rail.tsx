import { ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/common/logo'
import { SidebarItem } from '@/components/layout/sidebar-item'
import { useIsAdmin } from '@/features/admin/hooks/use-is-admin'
import { useVisibleNavItems } from '@/hooks/use-visible-nav-items'

/** Icon-only Spenza nav rail — column 1 of the full assistant layout, mirroring the app's own collapsed Sidebar so switching between them feels like the same app. Column 2 (ChatSidebar) holds the chat list. */
export function AssistantNavRail() {
  const { isAdmin } = useIsAdmin()
  const navItems = useVisibleNavItems()

  return (
    <aside className="flex h-full w-[76px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <Logo iconOnly />
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Primary">
        {navItems.map((item) => (
          <SidebarItem key={item.href} title={item.title} href={item.href} icon={item.icon} collapsed />
        ))}
        {isAdmin && <SidebarItem title="Admin" href="/admin" icon={ShieldCheck} collapsed />}
      </nav>
    </aside>
  )
}
