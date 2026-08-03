import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarCollapseButtonProps {
  collapsed: boolean
  onToggle: () => void
}

export function SidebarCollapseButton({ collapsed, onToggle }: SidebarCollapseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onClick={onToggle}
      className="text-muted-foreground"
    >
      {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
    </Button>
  )
}
