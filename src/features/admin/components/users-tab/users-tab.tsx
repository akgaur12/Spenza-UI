import { useEffect, useState } from 'react'
import { AdminPagination } from '@/features/admin/components/admin-pagination'
import { SendAdminEmailDialog } from '@/features/admin/components/email-tab/send-admin-email-dialog'
import { BroadcastDialog } from '@/features/admin/components/notifications-tab/broadcast-dialog'
import { ChangeRoleDialog } from '@/features/admin/components/users-tab/change-role-dialog'
import { DeleteUserDialog } from '@/features/admin/components/users-tab/delete-user-dialog'
import { UnlockUserDialog } from '@/features/admin/components/users-tab/unlock-user-dialog'
import { UserSessionsDialog } from '@/features/admin/components/users-tab/user-sessions-dialog'
import { UsersSearch } from '@/features/admin/components/users-tab/users-search'
import { UsersTable } from '@/features/admin/components/users-tab/users-table'
import { UsersTableSkeleton } from '@/features/admin/components/users-tab/users-table-skeleton'
import { useAdminUsers } from '@/features/admin/hooks/use-admin-users'
import type { AdminUserResponse } from '@/features/admin/types'
import { useMe } from '@/features/auth/hooks/use-me'

const PAGE_SIZE = 20

export function UsersTab() {
  const { data: currentUser } = useMe()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [unlockTarget, setUnlockTarget] = useState<AdminUserResponse | null>(null)
  const [roleTarget, setRoleTarget] = useState<AdminUserResponse | null>(null)
  const [sessionsTarget, setSessionsTarget] = useState<AdminUserResponse | null>(null)
  const [notifyTarget, setNotifyTarget] = useState<AdminUserResponse | null>(null)
  const [emailTarget, setEmailTarget] = useState<AdminUserResponse | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminUserResponse | null>(null)

  const { data, isLoading } = useAdminUsers({ page, page_size: PAGE_SIZE })

  useEffect(() => {
    if (data && data.items.length === 0 && page > 1) setPage(page - 1)
  }, [data, page])

  if (isLoading || !currentUser) return <UsersTableSkeleton />

  const items = data?.items ?? []
  const query = search.trim().toLowerCase()
  const filtered = query
    ? items.filter((user) => user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
    : items

  return (
    <div className="space-y-4">
      <UsersSearch value={search} onChange={setSearch} />

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No matching users on this page.</p>
      ) : (
        <UsersTable
          users={filtered}
          currentUserId={currentUser.id}
          onUnlock={setUnlockTarget}
          onChangeRole={setRoleTarget}
          onViewSessions={setSessionsTarget}
          onNotify={setNotifyTarget}
          onSendEmail={setEmailTarget}
          onDelete={setDeleteTarget}
        />
      )}

      {data && (
        <AdminPagination page={data.page} pageSize={data.page_size} total={data.total} itemLabel="user" onPageChange={setPage} />
      )}

      <UnlockUserDialog user={unlockTarget} onOpenChange={(open) => !open && setUnlockTarget(null)} />
      <ChangeRoleDialog user={roleTarget} onOpenChange={(open) => !open && setRoleTarget(null)} />
      <UserSessionsDialog user={sessionsTarget} onOpenChange={(open) => !open && setSessionsTarget(null)} />
      <BroadcastDialog
        open={notifyTarget !== null}
        onOpenChange={(open) => !open && setNotifyTarget(null)}
        targetUser={notifyTarget}
      />
      <SendAdminEmailDialog
        open={emailTarget !== null}
        onOpenChange={(open) => !open && setEmailTarget(null)}
        targetUser={emailTarget}
      />
      <DeleteUserDialog user={deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} />
    </div>
  )
}
