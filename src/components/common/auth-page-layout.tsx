import type { ReactNode } from 'react'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { cn } from '@/lib/utils'

export function AuthPageLayout({
  children,
  align = 'center',
}: {
  children: ReactNode
  align?: 'center' | 'center-high' | 'start'
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Logo />
        <ThemeToggle />
      </header>

      <main
        className={cn(
          'flex flex-1 flex-col items-center gap-6 px-6 py-10 justify-center',
          align === 'start' && 'justify-start pt-30',
          align === 'center' && '-mt-12',
          align === 'center-high' && '-mt-45',
        )}
      >
        {children}
      </main>
    </div>
  )
}

export function AuthPageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
