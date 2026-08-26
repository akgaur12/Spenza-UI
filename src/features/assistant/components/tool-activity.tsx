import { Check, Loader2, X } from 'lucide-react'
import type { ToolActivity as ToolActivityEntry } from '@/features/assistant/types/chat.types'
import { toolDoneLabel, toolStartedLabel } from '@/features/assistant/utils/tool-labels'

interface ToolActivityProps {
  entries: ToolActivityEntry[]
}

export function ToolActivity({ entries }: ToolActivityProps) {
  if (!entries.length) return null

  return (
    <ul className="flex flex-col gap-1">
      {entries.map((entry, index) => (
        <li key={`${entry.tool}-${index}`} className="flex items-center gap-2 text-xs text-muted-foreground">
          {entry.status === 'running' && <Loader2 className="size-3.5 shrink-0 animate-spin" />}
          {entry.status === 'ok' && <Check className="size-3.5 shrink-0 text-primary" />}
          {entry.status === 'error' && <X className="size-3.5 shrink-0 text-destructive" />}
          <span>{entry.status === 'running' ? toolStartedLabel(entry.tool) : toolDoneLabel(entry.tool, entry.status)}</span>
        </li>
      ))}
    </ul>
  )
}
