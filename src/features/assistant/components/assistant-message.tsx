import { Sparkles } from 'lucide-react'
import { memo } from 'react'
import { MessageRenderer } from '@/features/assistant/components/message-renderer'
import { ToolActivity } from '@/features/assistant/components/tool-activity'
import type { ToolActivity as ToolActivityEntry } from '@/features/assistant/types/chat.types'

interface AssistantMessageProps {
  content: string
  toolLog?: ToolActivityEntry[]
  isStreaming?: boolean
}

export const AssistantMessage = memo(function AssistantMessage({ content, toolLog, isStreaming }: AssistantMessageProps) {
  return (
    <div className="flex gap-2.5">
      <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        {toolLog && toolLog.length > 0 && <ToolActivity entries={toolLog} />}
        {content && <MessageRenderer content={content} />}
        {!content && !isStreaming && <p className="text-sm text-muted-foreground italic">No response generated.</p>}
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-muted-foreground align-middle" aria-hidden="true" />
        )}
      </div>
    </div>
  )
})
