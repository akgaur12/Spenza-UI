import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickActionButtonProps {
  icon: LucideIcon
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

/** Mobile-only compact quick action: circular icon button with a label underneath, like a native finance app. */
export function QuickActionButton({ icon: Icon, label, variant = 'secondary', onClick }: QuickActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-1.5 focus-visible:outline-none"
    >
      <span
        className={cn(
          'flex size-14 items-center justify-center rounded-full transition-transform active:scale-95',
          variant === 'primary'
            ? 'bg-primary text-primary-foreground'
            : 'bg-accent text-accent-foreground',
        )}
      >
        <Icon className="size-6" />
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </button>
  )
}
