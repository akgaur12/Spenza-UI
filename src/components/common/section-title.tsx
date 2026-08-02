import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ eyebrow, title, description, align = 'center', className }: SectionTitleProps) {
  return (
    <div className={cn('max-w-2xl space-y-3', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-muted-foreground text-balance">{description}</p>}
    </div>
  )
}
