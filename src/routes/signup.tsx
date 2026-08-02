import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignupPage } from '@/features/auth/components/signup-page'
import { getAuthUser } from '@/features/auth/utils/get-auth-user'

export const Route = createFileRoute('/signup')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    if (user) throw redirect({ to: '/dashboard' })
  },
  component: SignupPage,
})
