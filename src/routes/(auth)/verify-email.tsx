import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { VerifyEmailPage } from '@/features/auth/components/verify-email-page'

const searchSchema = z.object({
  email: z
    .string()
    .email()
    .catch(() => ''),
})

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    if (!search.email) throw redirect({ to: '/signup' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  return <VerifyEmailPage email={email} />
}
