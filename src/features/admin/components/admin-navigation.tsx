import { LayoutDashboard, Mail, Send, Tag, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { AdminSectionKey } from '@/features/admin/types'

export const ADMIN_SECTIONS: { value: AdminSectionKey; label: string; icon: LucideIcon }[] = [
  { value: 'overview', label: 'Overview', icon: LayoutDashboard },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'categories', label: 'Categories', icon: Tag },
  { value: 'notifications', label: 'Notifications', icon: Send },
  { value: 'email', label: 'Email', icon: Mail },
]

/**
 * Two `TabsList`s bound to the same `Tabs` root — mirrors
 * `SettingsNavigation`'s established pattern for a section switcher that
 * differs structurally between desktop (vertical sidebar) and mobile
 * (horizontal scrollable bar).
 */
export function AdminNavigation() {
  return (
    <>
      <TabsList
        variant="line"
        className="hidden w-48 shrink-0 flex-col items-stretch justify-start gap-1 lg:flex"
      >
        {ADMIN_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value} className="justify-start gap-2 px-3">
            <section.icon className="size-4" />
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsList variant="line" className="flex w-full justify-start gap-1 overflow-x-auto lg:hidden">
        {ADMIN_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value} className="gap-1.5 whitespace-nowrap">
            <section.icon className="size-4" />
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  )
}
