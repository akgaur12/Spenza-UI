import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SettingsSection } from '@/features/settings/components/settings-section'
import { ThemeSelector } from '@/features/settings/components/theme-selector'

const COMING_SOON = ['Currency', 'Timezone', 'Language']

export function AppearanceSettings() {
  return (
    <SettingsSection title="Appearance" description="Customize how Spenza looks on this device.">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose light, dark, or match your system setting.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>

        <Separator />

        <CardContent className="space-y-3">
          {COMING_SOON.map((label) => (
            <div key={label} className="flex items-center justify-between rounded-md border border-dashed px-3 py-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
