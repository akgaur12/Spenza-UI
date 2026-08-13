import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AdminNavigation } from '@/features/admin/components/admin-navigation'
import { CategoriesTab } from '@/features/admin/components/categories-tab/categories-tab'
import { EmailTab } from '@/features/admin/components/email-tab/email-tab'
import { NotificationsTab } from '@/features/admin/components/notifications-tab/notifications-tab'
import { OverviewTab } from '@/features/admin/components/overview-tab/overview-tab'
import { UsersTab } from '@/features/admin/components/users-tab/users-tab'
import type { AdminSectionKey } from '@/features/admin/types'

export function AdminPage() {
  const [section, setSection] = useState<AdminSectionKey>('overview')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admin</h1>

      <Tabs value={section} onValueChange={(value) => setSection(value as AdminSectionKey)}>
        <div className="flex flex-col gap-6 lg:flex-row">
          <AdminNavigation />

          <div className="min-w-0 flex-1">
            <TabsContent value="overview" className="mt-0">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="users" className="mt-0">
              <UsersTab />
            </TabsContent>
            <TabsContent value="categories" className="mt-0">
              <CategoriesTab />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <NotificationsTab />
            </TabsContent>
            <TabsContent value="email" className="mt-0">
              <EmailTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
