import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M16 5 L27 16 L16 27 L5 16 Z"
        fill="none"
        stroke="var(--logo-outer)"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.5 L20.5 16 L16 20.5 L11.5 16 Z"
        fill="none"
        stroke="var(--logo-inner)"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className, iconOnly }: { className?: string; iconOnly?: boolean }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}>
      <LogoMark className="size-8 shrink-0" />
      {!iconOnly && <span className="text-lg">Spenza</span>}
    </Link>
  )
}
