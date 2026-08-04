import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { LoadingButton } from '@/components/common/loading-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLogoutMutation } from '@/features/auth/hooks/use-auth-mutations'
import { DangerZoneCard } from '@/features/settings/components/danger-zone-card'
import { SettingsSection } from '@/features/settings/components/settings-section'

export function AccountSettings() {
  const navigate = useNavigate()
  const logoutMutation = useLogoutMutation()

  function handleLogout() {
    logoutMutation.mutate(undefined, { onSuccess: () => navigate({ to: '/login' }) })
  }

  return (
    <SettingsSection title="Account" description="Manage your session and account lifecycle.">
      <Card>
        <CardHeader>
          <CardTitle>Log out</CardTitle>
          <CardDescription>Sign out of Spenza on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingButton
            variant="outline"
            isLoading={logoutMutation.isPending}
            loadingText="Logging out..."
            onClick={handleLogout}
          >
            <LogOut />
            Log out
          </LoadingButton>
        </CardContent>
      </Card>

      <DangerZoneCard />
    </SettingsSection>
  )
}
