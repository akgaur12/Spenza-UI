import { Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AppContainer } from '@/components/layout/app-container'
import { ContentContainer } from '@/components/layout/content-container'
import { DrawerNavigation } from '@/components/layout/drawer-navigation'
import { MobileBottomNavigation } from '@/components/layout/mobile-bottom-navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { SidebarProvider } from '@/components/layout/sidebar-context'
import { Topbar } from '@/components/layout/topbar'
import { AddExpenseProvider } from '@/features/expenses/components/add-expense-provider'
import { useMediaQuery } from '@/hooks/use-media-query'

export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isDesktop) setDrawerOpen(false)
  }, [isDesktop])

  return (
    <SidebarProvider>
      <AddExpenseProvider>
        <AppContainer>
          <Sidebar />

          <div className="scrollbar-thin flex min-w-0 flex-1 flex-col overflow-y-auto">
            <Topbar onOpenDrawer={() => setDrawerOpen(true)} />
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          </div>

          <MobileBottomNavigation />
          <DrawerNavigation open={drawerOpen} onOpenChange={setDrawerOpen} />
        </AppContainer>
      </AddExpenseProvider>
    </SidebarProvider>
  )
}
