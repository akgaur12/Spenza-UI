import { BarChart3, FileText, Home, Repeat, Settings, Wallet } from 'lucide-react'
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
  { title: 'Reports', href: '/reports', icon: FileText },
  { title: 'Recurring Expenses', href: '/recurring-expenses', icon: Repeat },
  { title: 'Settings', href: '/settings', icon: Settings },
]
