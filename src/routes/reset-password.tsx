import { createFileRoute, redirect } from '@tanstack/react-router'
import { ResetPasswordPage } from '@/features/auth/components/reset-password-page'
import { resetTokenStorage } from '@/features/auth/utils/flow-storage'

export const Route = createFileRoute('/reset-password')({
  beforeLoad: () => {
    const resetToken = resetTokenStorage.get()
    if (!resetToken) throw redirect({ to: '/forgot-password' })
    return { resetToken }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { resetToken } = Route.useRouteContext()
  return <ResetPasswordPage resetToken={resetToken} />
}
