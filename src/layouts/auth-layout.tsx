import type { ReactNode } from 'react'
import { BarChart3, PiggyBank, Receipt } from 'lucide-react'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'

const HIGHLIGHTS = [
  { icon: Receipt, text: 'Log expenses in seconds' },
  { icon: PiggyBank, text: 'Understand where your money goes' },
  { icon: BarChart3, text: 'Track trends with beautiful analytics' },
]

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col justify-between overflow-hidden border-r border-border bg-secondary/40 p-10 max-lg:hidden">
        <Logo />

        <div className="space-y-8">
          <h1 className="max-w-md text-4xl font-semibold tracking-tight text-balance">
            Track every expense. Understand every rupee.
          </h1>
          <ul className="space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-muted-foreground">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                  <Icon className="size-4.5 text-primary" />
                </span>
                <span className="text-sm font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Spenza. All rights reserved.</p>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="relative flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">{children}</div>
      </div>
    </div>
  )
}
