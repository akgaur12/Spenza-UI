import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AuthCard } from '@/components/common/auth-card'
import { AuthPageHeading, AuthPageLayout } from '@/components/common/auth-page-layout'
import { LoadingButton } from '@/components/common/loading-button'
import { PasswordInput } from '@/components/forms/password-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useResetPasswordMutation } from '@/features/auth/hooks/use-auth-mutations'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/features/auth/schemas/reset-password.schema'
import { resetTokenStorage } from '@/features/auth/utils/flow-storage'

export function ResetPasswordPage({ resetToken }: { resetToken: string }) {
  const navigate = useNavigate()
  const resetPasswordMutation = useResetPasswordMutation()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  function onSubmit(values: ResetPasswordFormValues) {
    resetPasswordMutation.mutate(
      { reset_token: resetToken, new_password: values.newPassword },
      {
        onSuccess: () => {
          resetTokenStorage.clear()
          navigate({ to: '/login' })
        },
      },
    )
  }

  return (
    <AuthPageLayout align="center-high">
      <div className="-mt-12 flex flex-col items-center gap-6">
        <AuthPageHeading title="Reset password" description="Choose a new password for your account." />

        <AuthCard>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" autoComplete="new-password" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      At least 8 characters, with uppercase, lowercase, a number, and a symbol.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                type="submit"
                className="w-full transition-opacity duration-300"
                isLoading={resetPasswordMutation.isPending}
                disabled={!form.formState.isValid}
                loadingText="Resetting..."
              >
                Reset password
              </LoadingButton>
            </form>
          </Form>
        </AuthCard>
      </div>
    </AuthPageLayout>
  )
}
