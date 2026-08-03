import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/features/auth/components/auth-provider'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { isAuthenticated, isLoading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isLoading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : isAuthenticated ? (
            <Button asChild>
              <Link to="/overview">Overview</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Create account</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          'grid overflow-hidden border-b border-border/80 transition-[grid-template-rows] duration-200 md:hidden',
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-2 px-6 pb-4">
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/overview">Overview</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Create account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
