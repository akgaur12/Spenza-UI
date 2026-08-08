import { Bell, Download, FileText, Info, Repeat, ShieldCheck, Sparkles, Upload } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NotificationType } from '@/features/notifications/types'

/** Known-type → icon. Anything not listed here (including future backend types) falls back to
 * a generic bell in `notificationIcon` — never let an unrecognized type break the UI. */
const NOTIFICATION_TYPE_ICONS: Partial<Record<NotificationType, LucideIcon>> = {
  welcome: Sparkles,
  report_ready: FileText,
  import_completed: Upload,
  export_completed: Download,
  recurring_expense_created: Repeat,
  password_changed: ShieldCheck,
  system: Info,
}

export function notificationIcon(type: NotificationType): LucideIcon {
  return NOTIFICATION_TYPE_ICONS[type] ?? Bell
}

/** Human-friendly label for a raw backend type — used in preferences and (optionally) type filters. */
const NOTIFICATION_TYPE_LABELS: Partial<Record<NotificationType, string>> = {
  welcome: 'Welcome',
  report_ready: 'Report Ready',
  import_completed: 'Import Completed',
  export_completed: 'Export Completed',
  recurring_expense_created: 'Recurring Expense Created',
  password_changed: 'Password Changed',
  system: 'System',
  ai_insight: 'AI Insights',
  security_alert: 'Security Alerts',
  subscription_expiring: 'Subscription Expiring',
  budget_alert: 'Budget Alerts',
  weekly_summary: 'Weekly Summary',
}

/** Title-cases an unrecognized `snake_case` type as a last resort, e.g. `"foo_bar"` → `"Foo Bar"`. */
function titleCaseFallback(type: NotificationType): string {
  return type
    .split('_')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')
}

export function notificationTypeLabel(type: NotificationType): string {
  return NOTIFICATION_TYPE_LABELS[type] ?? titleCaseFallback(type) ?? 'Notification'
}
