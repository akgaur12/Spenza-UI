import { useAuth } from '@/features/auth/components/auth-provider'
import { ProfileCard } from '@/features/settings/components/profile-card'
import { SettingsSection } from '@/features/settings/components/settings-section'
import { SettingsSkeleton } from '@/features/settings/components/settings-skeleton'

interface ProfileSettingsProps {
  onDirtyChange: (dirty: boolean) => void
}

export function ProfileSettings({ onDirtyChange }: ProfileSettingsProps) {
  const { user, isLoading } = useAuth()

  return (
    <SettingsSection title="Profile" description="Manage your personal information.">
      {isLoading || !user ? <SettingsSkeleton /> : <ProfileCard user={user} onDirtyChange={onDirtyChange} />}
    </SettingsSection>
  )
}
