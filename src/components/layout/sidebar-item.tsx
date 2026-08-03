import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  title: string
  href: string
  icon: LucideIcon
  collapsed: boolean
}

export function SidebarItem({ title, href, icon: Icon, collapsed }: SidebarItemProps) {
  const link = (
    <Link
      to={href}
      aria-label={title}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
        'data-[status=active]:bg-primary/10 data-[status=active]:text-primary',
        collapsed && 'justify-center px-0',
      )}
    >
      <Icon className="size-5 shrink-0" />
      {!collapsed && <span className="truncate">{title}</span>}
    </Link>
  )

  if (!collapsed) return link

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}
