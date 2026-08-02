import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AuthCard } from '@/components/common/auth-card'
import { AuthPageHeading, AuthPageLayout } from '@/components/common/auth-page-layout'
import { LoadingButton } from '@/components/common/loading-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPasswordMutation } from '@/features/auth/hooks/use-auth-mutations'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/features/auth/schemas/forgot-password.schema'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const forgotPasswordMutation = useForgotPasswordMutation()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: { email: '' },
  })

  function onSubmit(values: ForgotPasswordFormValues) {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => navigate({ to: '/reset-password/verify', search: { email: values.email } }),
    })
  }

  return (
    <AuthPageLayout align="start">
      <div className="mt-16 flex flex-col items-center gap-6">
        <AuthPageHeading
          title="Forgot password"
          description="Enter your email and we'll send you a one-time code to reset your password."
        />

        <AuthCard
          footer={
            <>
              Remembered your password?{' '}
              <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Back to login
              </Link>
            </>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="rahul@example.com"
                        autoComplete="email"
                        className="placeholder:text-muted-foreground/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                type="submit"
                className="w-full transition-opacity duration-300"
                isLoading={forgotPasswordMutation.isPending}
                disabled={!form.formState.isValid}
                loadingText="Sending..."
              >
                Send OTP
              </LoadingButton>
            </form>
          </Form>
        </AuthCard>
      </div>
    </AuthPageLayout>
  )
}
