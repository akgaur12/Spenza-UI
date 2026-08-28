import { NAV_ITEMS } from '@/config/navigation'
import { useAuth } from '@/features/auth/components/auth-provider'

/** NAV_ITEMS filtered for the current user — hides Assistant when they haven't been granted AI assistant access. */
export function useVisibleNavItems() {
  const { user } = useAuth()
  const aiAssistantEnabled = user?.ai_assistant.enabled ?? false

  return NAV_ITEMS.filter((item) => item.href !== '/assistant' || aiAssistantEnabled)
}
