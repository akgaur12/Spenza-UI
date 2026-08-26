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
    <div className="flex h-full -translate-y-20 flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="size-9 text-primary" />
          <h2 className="text-3xl font-semibold text-foreground">Spenza AI</h2>
        </div>
        <p className="text-sm whitespace-nowrap text-muted-foreground">
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
