import { Navbar } from '@/components/layout/navbar'
import { useAuth } from '@/features/auth/components/auth-provider'
import { useLogoutMutation } from '@/features/auth/hooks/use-auth-mutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardPage() {
  const { user } = useAuth()
  const logoutMutation = useLogoutMutation()

  return (
    <div className="min-h-svh">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <CardTitle>Welcome, {user?.full_name || user?.username}</CardTitle>
            <CardDescription>
              This is a placeholder — expense tracking, categories, and analytics land in the next phase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
              Log out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
