import { Link } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/components/auth-provider'
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

export function Logo({
  className,
  iconOnly,
  size = 'default',
}: {
  className?: string
  iconOnly?: boolean
  size?: 'default' | 'sm'
}) {
  const { isAuthenticated } = useAuth()

  return (
    <Link
      to={isAuthenticated ? '/overview' : '/'}
      className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}
    >
      <LogoMark className={cn('shrink-0', size === 'sm' ? 'size-6' : 'size-8')} />
      {!iconOnly && <span className={size === 'sm' ? 'text-base' : 'text-lg'}>Spenza</span>}
    </Link>
  )
}
