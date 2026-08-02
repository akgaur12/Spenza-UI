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
import { useSignupMutation } from '@/features/auth/hooks/use-auth-mutations'
import { signupSchema, type SignupFormValues } from '@/features/auth/schemas/signup.schema'

export function SignupPage() {
  const navigate = useNavigate()
  const signupMutation = useSignupMutation()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  function onSubmit(values: SignupFormValues) {
    signupMutation.mutate(
      {
        email: values.email,
        username: values.username,
        password: values.password,
        full_name: values.fullName || undefined,
      },
      {
        onSuccess: (_user, variables) => {
          navigate({ to: '/verify-email', search: { email: variables.email } })
        },
      },
    )
  }

  return (
    <AuthPageLayout>
      <AuthPageHeading title="Create your account" description="Start tracking your expenses in minutes." />

      <AuthCard
        footer={
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rahul Sharma"
                      autoComplete="name"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="rahul_sharma"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-start gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} id="accept-terms" />
                    </FormControl>
                    <FormLabel
                      htmlFor="accept-terms"
                      className="cursor-pointer text-[13px] leading-snug font-normal text-muted-foreground"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary underline-offset-4 hover:underline">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full transition-opacity duration-300"
              isLoading={signupMutation.isPending}
              disabled={!form.formState.isValid}
              loadingText="Creating account..."
            >
              Create account
            </LoadingButton>
          </form>
        </Form>
      </AuthCard>
    </AuthPageLayout>
  )
}
