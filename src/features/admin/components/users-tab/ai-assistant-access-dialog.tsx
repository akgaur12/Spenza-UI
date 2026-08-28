import { useEffect, useState } from 'react'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { useUpdateAiAssistantPermissionMutation } from '@/features/admin/hooks/use-admin-user-mutations'
import { useUserAiAssistantPermission } from '@/features/admin/hooks/use-user-ai-assistant-permission'
import type { AdminUserResponse } from '@/features/admin/types'

interface AiAssistantAccessDialogProps {
  user: AdminUserResponse | null
  onOpenChange: (open: boolean) => void
}

interface LimitFieldState {
  maxMessagesPerMinute: string
  maxMessagesPerDay: string
  maxMessagesPerMonth: string
  maxNewChatsPerDay: string
  maxNewChatsPerMonth: string
}

const EMPTY_LIMITS: LimitFieldState = {
  maxMessagesPerMinute: '',
  maxMessagesPerDay: '',
  maxMessagesPerMonth: '',
  maxNewChatsPerDay: '',
  maxNewChatsPerMonth: '',
}

function toFieldValue(value: number | null): string {
  return value === null ? '' : String(value)
}

/** Empty field = unlimited (null). Otherwise a non-negative integer. */
function toPayloadValue(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '') return null
  return Math.max(0, Math.trunc(Number(trimmed)))
}

export function AiAssistantAccessDialog({ user, onOpenChange }: AiAssistantAccessDialogProps) {
  const { data, isLoading } = useUserAiAssistantPermission(user?.id ?? null)
  const updateMutation = useUpdateAiAssistantPermissionMutation()
  const [enabled, setEnabled] = useState(false)
  const [limits, setLimits] = useState<LimitFieldState>(EMPTY_LIMITS)

  useEffect(() => {
    if (data) {
      setEnabled(data.enabled)
      setLimits({
        maxMessagesPerMinute: toFieldValue(data.max_messages_per_minute),
        maxMessagesPerDay: toFieldValue(data.max_messages_per_day),
        maxMessagesPerMonth: toFieldValue(data.max_messages_per_month),
        maxNewChatsPerDay: toFieldValue(data.max_new_chats_per_day),
        maxNewChatsPerMonth: toFieldValue(data.max_new_chats_per_month),
      })
    } else if (!user) {
      setEnabled(false)
      setLimits(EMPTY_LIMITS)
    }
  }, [data, user])

  function updateLimit(field: keyof LimitFieldState, value: string) {
    setLimits((current) => ({ ...current, [field]: value }))
  }

  function handleSave() {
    if (!user) return
    updateMutation.mutate(
      {
        userId: user.id,
        payload: {
          enabled,
          max_messages_per_minute: toPayloadValue(limits.maxMessagesPerMinute),
          max_messages_per_day: toPayloadValue(limits.maxMessagesPerDay),
          max_messages_per_month: toPayloadValue(limits.maxMessagesPerMonth),
          max_new_chats_per_day: toPayloadValue(limits.maxNewChatsPerDay),
          max_new_chats_per_month: toPayloadValue(limits.maxNewChatsPerMonth),
        },
      },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <Dialog open={Boolean(user)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>AI assistant access</DialogTitle>
          <DialogDescription>
            Control whether <span className="font-medium text-foreground">{user?.username}</span> can use Spenza AI,
            and cap how much they can use it.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">Access enabled</p>
                <p className="text-xs text-muted-foreground">Off by default — no access until granted here.</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            {data && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-md border border-border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground">
                <p>
                  Messages today: <span className="font-medium text-foreground">{data.messages_sent_today}</span>
                </p>
                <p>
                  Messages this month:{' '}
                  <span className="font-medium text-foreground">{data.messages_sent_this_month}</span>
                </p>
                <p>
                  Chats today: <span className="font-medium text-foreground">{data.chats_created_today}</span>
                </p>
                <p>
                  Chats this month: <span className="font-medium text-foreground">{data.chats_created_this_month}</span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Message limits</p>
              <div className="grid grid-cols-3 gap-3">
                <LimitInput
                  label="Per minute"
                  value={limits.maxMessagesPerMinute}
                  onChange={(value) => updateLimit('maxMessagesPerMinute', value)}
                />
                <LimitInput
                  label="Per day"
                  value={limits.maxMessagesPerDay}
                  onChange={(value) => updateLimit('maxMessagesPerDay', value)}
                />
                <LimitInput
                  label="Per month"
                  value={limits.maxMessagesPerMonth}
                  onChange={(value) => updateLimit('maxMessagesPerMonth', value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">New chat limits</p>
              <div className="grid grid-cols-2 gap-3">
                <LimitInput
                  label="Per day"
                  value={limits.maxNewChatsPerDay}
                  onChange={(value) => updateLimit('maxNewChatsPerDay', value)}
                />
                <LimitInput
                  label="Per month"
                  value={limits.maxNewChatsPerMonth}
                  onChange={(value) => updateLimit('maxNewChatsPerMonth', value)}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">Leave a field empty for unlimited.</p>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <LoadingButton onClick={handleSave} isLoading={updateMutation.isPending} loadingText="Saving…" disabled={isLoading}>
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function LimitInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="Unlimited"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
