import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@/layouts/auth-layout'

export const Route = createFileRoute('/(auth)')({
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
