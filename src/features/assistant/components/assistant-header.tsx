import { Link } from '@tanstack/react-router'
import { ArrowLeft, Menu, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AssistantHeaderProps {
  title?: string
  subtitle?: string
  onClose?: () => void
  onOpenSidebar?: () => void
  onBack?: () => void
  showFullAssistantLink?: boolean
}

export function AssistantHeader({ title = 'Spenza AI', subtitle, onClose, onOpenSidebar, onBack, showFullAssistantLink }: AssistantHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 border-b border-border px-3 py-2.5">
      {onBack && (
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Back" onClick={onBack}>
          <ArrowLeft className="size-4" />
        </Button>
      )}
      {onOpenSidebar && (
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Open conversations" onClick={onOpenSidebar}>
          <Menu className="size-4" />
        </Button>
      )}
      <div className="flex min-w-0 flex-1 items-center gap-2 px-1.5">
        <Sparkles className="size-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{title}</p>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {showFullAssistantLink && (
        <Link
          to="/assistant"
          onClick={onClose}
          className="hidden shrink-0 px-1 text-xs font-medium text-primary hover:underline md:inline-block"
        >
          Open full assistant →
        </Link>
      )}
      {onClose && (
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Close" onClick={onClose}>
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
