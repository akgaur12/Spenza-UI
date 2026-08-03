import { createContext, use, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface SidebarContextValue {
  collapsed: boolean
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const SIDEBAR_COLLAPSED_KEY = 'spenza:sidebar-collapsed'

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useLocalStorage(SIDEBAR_COLLAPSED_KEY, false)

  const value = useMemo<SidebarContextValue>(
    () => ({ collapsed, toggleCollapsed: () => setCollapsed((prev) => !prev) }),
    [collapsed, setCollapsed],
  )

  return <SidebarContext value={value}>{children}</SidebarContext>
}

export function useSidebar(): SidebarContextValue {
  const context = use(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
