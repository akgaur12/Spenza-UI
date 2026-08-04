import { Tag } from 'lucide-react'

export function CategoryIcon({ icon, className }: { icon: string | null; className?: string }) {
  return (
    <span
      className={className ?? 'flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg'}
      aria-hidden
    >
      {icon ?? <Tag className="size-4 text-muted-foreground" />}
    </span>
  )
}
