import { cn } from '@/lib/utils'
import { SUGGESTED_PROMPTS } from '@/features/assistant/utils/suggested-prompts'

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
  limit?: number
  /** 'list' (default) stacks full-width rows — fits the narrow floating panel. 'chips' wraps centered pills — fits the wide centered new-chat hero. */
  variant?: 'list' | 'chips'
}

export function SuggestedPrompts({ onSelect, disabled, limit, variant = 'list' }: SuggestedPromptsProps) {
  const prompts = limit ? SUGGESTED_PROMPTS.slice(0, limit) : SUGGESTED_PROMPTS

  return (
    <div className={cn(variant === 'chips' ? 'flex flex-wrap items-center justify-center gap-2' : 'flex flex-col gap-2')}>
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className={cn(
            'text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
            variant === 'chips'
              ? 'rounded-full border border-border bg-card px-4 py-2 text-sm'
              : 'rounded-lg border border-border bg-card px-3 py-2 text-left text-sm',
          )}
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
