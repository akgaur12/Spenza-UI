import { Sparkles } from 'lucide-react'
import { SuggestedPrompts } from '@/features/assistant/components/suggested-prompts'

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void
  disabled?: boolean
  compact?: boolean
}

export function EmptyChat({ onSelectPrompt, disabled, compact }: EmptyChatProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      <div className="max-w-md space-y-2">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className={compact ? 'size-7 text-primary' : 'size-9 text-primary'} />
          <h2 className={compact ? 'text-xl font-semibold text-foreground' : 'text-3xl font-semibold text-foreground'}>
            Spenza AI
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {compact
            ? 'Ask me about your spending, categories, or trends.'
            : 'Your personal expense assistant. Ask questions about your expenses, spending, categories and trends.'}
        </p>
      </div>
      <div className="w-full max-w-sm">
        <SuggestedPrompts onSelect={onSelectPrompt} disabled={disabled} limit={compact ? 3 : undefined} />
      </div>
    </div>
  )
}
