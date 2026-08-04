import { BarChart3, Home, Settings, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { title: 'Overview', href: '/overview', icon: Home },
  { title: 'Expenses', href: '/expenses', icon: Wallet },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/settings', icon: Settings },
]
