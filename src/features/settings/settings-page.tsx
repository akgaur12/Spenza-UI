import { useBlocker } from '@tanstack/react-router'
import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AccountSettings } from '@/features/settings/components/account-settings'
import { AppearanceSettings } from '@/features/settings/components/appearance-settings'
import { NotificationSettings } from '@/features/settings/components/notification-settings'
import { ProfileSettings } from '@/features/settings/components/profile-settings'
import { SecuritySettings } from '@/features/settings/components/security-settings'
import { SettingsNavigation } from '@/features/settings/components/settings-navigation'
import { UnsavedChangesDialog } from '@/features/settings/components/unsaved-changes-dialog'
import type { SettingsSectionKey } from '@/features/settings/types'

export function SettingsPage() {
  const [section, setSection] = useState<SettingsSectionKey>('profile')
  const [profileDirty, setProfileDirty] = useState(false)
  const [pendingSection, setPendingSection] = useState<SettingsSectionKey | null>(null)

  const isProfileTabDirty = section === 'profile' && profileDirty

  const routeBlocker = useBlocker({
    shouldBlockFn: () => isProfileTabDirty,
    enableBeforeUnload: isProfileTabDirty,
    withResolver: true,
  })

  function handleSectionChange(next: string) {
    const nextSection = next as SettingsSectionKey
    if (isProfileTabDirty && nextSection !== section) {
      setPendingSection(nextSection)
      return
    }
    setSection(nextSection)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Tabs value={section} onValueChange={handleSectionChange}>
        <div className="flex flex-col gap-6 lg:flex-row">
          <SettingsNavigation />

          <div className="min-w-0 flex-1">
            <TabsContent value="profile" className="mt-0">
              <ProfileSettings onDirtyChange={setProfileDirty} />
            </TabsContent>
            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="account" className="mt-0">
              <AccountSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <UnsavedChangesDialog
        open={pendingSection !== null}
        onStay={() => setPendingSection(null)}
        onDiscard={() => {
          if (pendingSection) setSection(pendingSection)
          setProfileDirty(false)
          setPendingSection(null)
        }}
      />

      <UnsavedChangesDialog
        open={routeBlocker.status === 'blocked'}
        onStay={() => routeBlocker.reset?.()}
        onDiscard={() => routeBlocker.proceed?.()}
      />
    </div>
  )
}
