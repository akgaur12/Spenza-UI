import { Bell, Palette, ShieldCheck, User, UserCog } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { SettingsSectionKey } from '@/features/settings/types'

export const SETTINGS_SECTIONS: { value: SettingsSectionKey; label: string; icon: LucideIcon }[] = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'appearance', label: 'Appearance', icon: Palette },
  { value: 'notifications', label: 'Notifications', icon: Bell },
  { value: 'security', label: 'Security', icon: ShieldCheck },
  { value: 'account', label: 'Account', icon: UserCog },
]

/**
 * Two `TabsList`s bound to the same `Tabs` root — one styled as a vertical desktop
 * sidebar, one as a scrollable horizontal mobile bar. Only one is ever visible
 * (CSS `hidden`/`flex` per breakpoint), matching the app's established pattern for
 * layouts that differ structurally between mobile and desktop.
 */
export function SettingsNavigation() {
  return (
    <>
      <TabsList
        variant="line"
        className="hidden w-48 shrink-0 flex-col items-stretch justify-start gap-1 lg:flex"
      >
        {SETTINGS_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value} className="justify-start gap-2 px-3">
            <section.icon className="size-4" />
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsList
        variant="line"
        className="flex w-full justify-start gap-1 overflow-x-auto lg:hidden"
      >
        {SETTINGS_SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value} className="gap-1.5 whitespace-nowrap">
            <section.icon className="size-4" />
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  )
}
