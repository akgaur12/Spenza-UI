import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { PasswordField } from '@/features/settings/components/password-field'
import { SettingsSection } from '@/features/settings/components/settings-section'
import { useSettingsChangePasswordMutation } from '@/features/settings/hooks/use-user-mutations'
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/features/settings/schemas/change-password.schema'

export function SecuritySettings() {
  const changePasswordMutation = useSettingsChangePasswordMutation()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  function onSubmit(values: ChangePasswordFormValues) {
    changePasswordMutation.mutate(
      { current_password: values.currentPassword, new_password: values.newPassword },
      { onSuccess: () => form.reset() },
    )
  }

  return (
    <SettingsSection title="Security" description="Keep your account secure with a strong password.">
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-4" noValidate>
              <PasswordField
                control={form.control}
                name="currentPassword"
                label="Current password"
                autoComplete="current-password"
              />
              <PasswordField
                control={form.control}
                name="newPassword"
                label="New password"
                autoComplete="new-password"
                description="At least 8 characters, with uppercase, lowercase, a number, and a symbol."
              />
              <PasswordField
                control={form.control}
                name="confirmPassword"
                label="Confirm new password"
                autoComplete="new-password"
              />
              <LoadingButton
                type="submit"
                isLoading={changePasswordMutation.isPending}
                loadingText="Updating..."
                disabled={!form.formState.isValid}
              >
                Update Password
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
