import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserRowActions } from '@/features/admin/components/users-tab/user-row-actions'
import { useSetUserActiveMutation } from '@/features/admin/hooks/use-admin-user-mutations'
import type { AdminUserResponse } from '@/features/admin/types'
import { formatExpenseTableDate } from '@/lib/format'

function isLocked(user: AdminUserResponse): boolean {
  return Boolean(user.locked_until) && new Date(user.locked_until!) > new Date()
}

interface UsersTableProps {
  users: AdminUserResponse[]
  currentUserId: string
  onUnlock: (user: AdminUserResponse) => void
  onChangeRole: (user: AdminUserResponse) => void
  onViewSessions: (user: AdminUserResponse) => void
  onNotify: (user: AdminUserResponse) => void
  onSendEmail: (user: AdminUserResponse) => void
  onDelete: (user: AdminUserResponse) => void
}

export function UsersTable({
  users,
  currentUserId,
  onUnlock,
  onChangeRole,
  onViewSessions,
  onNotify,
  onSendEmail,
  onDelete,
}: UsersTableProps) {
  const setActiveMutation = useSetUserActiveMutation()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isOwnAccount = user.id === currentUserId
          const locked = isLocked(user)

          return (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{user.full_name || user.username}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span title={isOwnAccount ? "You can't deactivate your own account" : undefined}>
                    <Switch
                      checked={user.is_active}
                      disabled={isOwnAccount || setActiveMutation.isPending}
                      onCheckedChange={(checked) =>
                        setActiveMutation.mutate({ userId: user.id, payload: { is_active: checked } })
                      }
                    />
                  </span>
                  {locked && <Badge variant="destructive">Locked</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatExpenseTableDate(user.created_at)}</TableCell>
              <TableCell>
                <UserRowActions
                  role={user.role}
                  isOwnAccount={isOwnAccount}
                  isLocked={locked}
                  onUnlock={() => onUnlock(user)}
                  onChangeRole={() => onChangeRole(user)}
                  onViewSessions={() => onViewSessions(user)}
                  onNotify={() => onNotify(user)}
                  onSendEmail={() => onSendEmail(user)}
                  onDelete={() => onDelete(user)}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
