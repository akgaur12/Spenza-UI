import { createFileRoute, redirect } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/app-layout'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { getAuthUser } from '@/features/auth/utils/get-auth-user'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    if (!user) throw redirect({ to: '/login' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  )
}
