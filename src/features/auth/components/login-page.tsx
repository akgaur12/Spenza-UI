import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AuthCard } from '@/components/common/auth-card'
import { AuthPageHeading, AuthPageLayout } from '@/components/common/auth-page-layout'
import { LoadingButton } from '@/components/common/loading-button'
import { PasswordInput } from '@/components/forms/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/features/auth/hooks/use-auth-mutations'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'

export function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { identifier: '', password: '', rememberMe: false },
  })

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(
      { identifier: values.identifier, password: values.password },
      { onSuccess: () => navigate({ to: '/dashboard' }) },
    )
  }

  return (
    <AuthPageLayout align="center-high">
      <AuthPageHeading title="Welcome back" description="Log in to continue tracking your expenses." />

      <AuthCard
        footer={
          <>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
              Create account
            </Link>
          </>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="rahul_sharma or rahul@example.com"
                      autoComplete="username"
                      className="placeholder:text-muted-foreground/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="••••••••" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="remember-me" />
                  </FormControl>
                  <FormLabel htmlFor="remember-me" className="cursor-pointer font-normal">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full transition-opacity duration-300"
              isLoading={loginMutation.isPending}
              disabled={!form.formState.isValid}
              loadingText="Logging in..."
            >
              Login
            </LoadingButton>
          </form>
        </Form>
      </AuthCard>
    </AuthPageLayout>
  )
}
