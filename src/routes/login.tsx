import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/features/auth/components/login-page'
import { getAuthUser } from '@/features/auth/utils/get-auth-user'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    if (user) throw redirect({ to: '/overview' })
  },
  component: LoginPage,
})
