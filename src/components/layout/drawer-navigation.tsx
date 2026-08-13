import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/common/logo'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/config/navigation'
import { useIsAdmin } from '@/features/admin/hooks/use-is-admin'
import { useLogoutMutation } from '@/features/auth/hooks/use-auth-mutations'
import { cn } from '@/lib/utils'

interface DrawerNavigationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DrawerNavigation({ open, onOpenChange }: DrawerNavigationProps) {
  const navigate = useNavigate()
  const logoutMutation = useLogoutMutation()
  const { isAdmin } = useIsAdmin()

  function handleLogout() {
    onOpenChange(false)
    logoutMutation.mutate(undefined, { onSuccess: () => navigate({ to: '/' }) })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">Links to every section of the app</SheetDescription>
          <Logo />
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                'data-[status=active]:bg-primary/10 data-[status=active]:text-primary',
              )}
            >
              <item.icon className="size-5 shrink-0" />
              {item.title}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                'data-[status=active]:bg-primary/10 data-[status=active]:text-primary',
              )}
            >
              <ShieldCheck className="size-5 shrink-0" />
              Admin
            </Link>
          )}
        </nav>

        <Separator />

        <div className="p-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
          >
            <LogOut className="size-5" />
            Log out
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
