import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { AuthCard } from '@/components/common/auth-card'
import { LoadingButton } from '@/components/common/loading-button'
import { PasswordInput } from '@/components/forms/password-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignupMutation } from '@/features/auth/hooks/use-auth-mutations'
import { signupSchema, type SignupFormValues } from '@/features/auth/schemas/signup.schema'

export function SignupPage() {
  const navigate = useNavigate()
  const signupMutation = useSignupMutation()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', username: '', email: '', password: '', confirmPassword: '' },
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
    <AuthCard
      title="Create your account"
      description="Start tracking your expenses in minutes."
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
                  <Input placeholder="Jane Doe" autoComplete="name" {...field} />
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
                  <Input placeholder="jane_doe" autoComplete="username" {...field} />
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
                  <Input type="email" placeholder="jane@example.com" autoComplete="email" {...field} />
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
            className="w-full"
            isLoading={signupMutation.isPending}
            loadingText="Creating account..."
          >
            Create account
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  )
}
