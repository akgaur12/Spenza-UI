import { createFileRoute, redirect } from '@tanstack/react-router'
import { LandingPage } from '@/features/landing/landing-page'
import { getAuthUser } from '@/features/auth/utils/get-auth-user'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    if (user) throw redirect({ to: '/overview' })
  },
  component: LandingPage,
})
