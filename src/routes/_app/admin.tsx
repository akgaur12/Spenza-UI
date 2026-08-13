import { createFileRoute, redirect } from '@tanstack/react-router'
import { getIsAdmin } from '@/features/admin/utils/get-is-admin'
import { AdminPage } from '@/features/admin/admin-page'

export const Route = createFileRoute('/_app/admin')({
  beforeLoad: async ({ context }) => {
    const isAdmin = await getIsAdmin(context.queryClient)
    if (!isAdmin) throw redirect({ to: '/overview' })
  },
  component: AdminPage,
})
