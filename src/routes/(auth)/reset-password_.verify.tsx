import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { VerifyResetOtpPage } from '@/features/auth/components/verify-reset-otp-page'

const searchSchema = z.object({
  email: z
    .string()
    .email()
    .catch(() => ''),
})

export const Route = createFileRoute('/(auth)/reset-password_/verify')({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    if (!search.email) throw redirect({ to: '/forgot-password' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  return <VerifyResetOtpPage email={email} />
}
