import { Sparkles } from 'lucide-react'
import { ChatComposer } from '@/features/assistant/components/chat-composer'
import { SuggestedPrompts } from '@/features/assistant/components/suggested-prompts'

interface NewChatHeroProps {
  onSend: (message: string) => void
  onStop: () => void
  isStreaming: boolean
}

/** ChatGPT-style landing state for a chat with no messages yet — greeting, composer, and suggestions all centered together in column 3, instead of the composer pinned to the bottom. */
export function NewChatHero({ onSend, onStop, isStreaming }: NewChatHeroProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-8 sm:-translate-y-20">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Sparkles className="size-7 text-primary sm:size-9" />
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Spenza AI</h2>
        </div>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground sm:max-w-none sm:whitespace-nowrap">
          Your personal expense assistant. Ask questions about your expenses, spending, categories and trends.
        </p>
      </div>
      <div className="w-full max-w-3xl space-y-5">
        <ChatComposer onSend={onSend} onStop={onStop} isStreaming={isStreaming} autoFocus />
        <SuggestedPrompts onSelect={onSend} disabled={isStreaming} variant="chips" />
      </div>
    </div>
  )
}
