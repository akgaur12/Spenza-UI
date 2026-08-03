import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavigationItemProps {
  title: string
  href: string
  icon: LucideIcon
}

export function MobileNavigationItem({ title, href, icon: Icon }: MobileNavigationItemProps) {
  return (
    <Link
      to={href}
      aria-label={title}
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-muted-foreground transition-colors',
        'data-[status=active]:text-primary',
      )}
    >
      <Icon className="size-5" />
      <span className="text-[11px] font-medium">{title}</span>
    </Link>
  )
}
