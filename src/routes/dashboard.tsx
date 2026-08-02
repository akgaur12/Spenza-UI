import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardPage } from '@/features/dashboard/dashboard-page'
import { getAuthUser } from '@/features/auth/utils/get-auth-user'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    if (!user) throw redirect({ to: '/login' })
  },
  component: DashboardPage,
})
