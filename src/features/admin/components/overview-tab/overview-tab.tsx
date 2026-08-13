import type { ReactNode } from 'react'
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Layers,
  Lock,
  Receipt,
  Repeat,
  ShieldCheck,
  Tag,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAdminStatsOverview } from '@/features/admin/hooks/use-admin-stats'
import { SummaryCard } from '@/features/overview/components/summary-card'

function StatSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{children}</div>
      </CardContent>
    </Card>
  )
}

export function OverviewTab() {
  const { data, isLoading } = useAdminStatsOverview()

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full" />
        ))}
      </div>
    )
  }

  const { users, expenses, recurring_expenses, categories, notifications } = data
  const hasLockedAccounts = users.locked > 0
  const hasDeliveryFailures = notifications.delivery_failures_last_7_days > 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">System overview</h1>
        <p className="text-sm text-muted-foreground">A snapshot of activity and health across every user.</p>
      </div>

      <StatSection title="Users" description="Account counts and recent signups">
        <SummaryCard title="Total" icon={Users} amount={users.total.toLocaleString()} />
        <SummaryCard title="Active" icon={UserCheck} amount={users.active.toLocaleString()} tone="success" />
        <SummaryCard title="Inactive" icon={UserX} amount={users.inactive.toLocaleString()} />
        <SummaryCard title="Admins" icon={ShieldCheck} amount={users.admins.toLocaleString()} />
        <SummaryCard
          title="Locked"
          icon={Lock}
          amount={users.locked.toLocaleString()}
          tone={hasLockedAccounts ? 'destructive' : 'success'}
        />
        <SummaryCard title="Verified" icon={UserCheck} amount={users.verified.toLocaleString()} />
        <SummaryCard title="Signups (7d)" icon={UserPlus} amount={users.signups_last_7_days.toLocaleString()} />
        <SummaryCard title="Signups (30d)" icon={UserPlus} amount={users.signups_last_30_days.toLocaleString()} />
      </StatSection>

      <StatSection title="Expenses" description="Spending activity logged across every account">
        <SummaryCard title="Total Expenses" icon={Receipt} amount={expenses.total_count.toLocaleString()} />
        <SummaryCard title="Created (30d)" icon={CalendarDays} amount={expenses.created_last_30_days.toLocaleString()} />
      </StatSection>

      <StatSection title="Recurring Expenses" description="Scheduled expenses currently on file">
        <SummaryCard title="Total" icon={Repeat} amount={recurring_expenses.total.toLocaleString()} />
        <SummaryCard title="Active" icon={Repeat} amount={recurring_expenses.active.toLocaleString()} tone="success" />
      </StatSection>

      <StatSection title="Categories" description="System defaults vs. user-created categories">
        <SummaryCard title="System" icon={Tag} amount={categories.system_count.toLocaleString()} />
        <SummaryCard title="Custom" icon={Layers} amount={categories.custom_count.toLocaleString()} />
      </StatSection>

      <StatSection title="Notifications" description="Delivery volume and recent failures">
        <SummaryCard title="Total Sent" icon={Bell} amount={notifications.total_sent.toLocaleString()} tone="success" />
        <SummaryCard
          title="Failures (7d)"
          icon={AlertTriangle}
          amount={notifications.delivery_failures_last_7_days.toLocaleString()}
          tone={hasDeliveryFailures ? 'destructive' : 'success'}
        />
      </StatSection>
    </div>
  )
}
