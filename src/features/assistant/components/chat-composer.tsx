import { ArrowUp, Square } from 'lucide-react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const MAX_TEXTAREA_HEIGHT_PX = 160

interface ChatComposerProps {
  onSend: (message: string) => void
  onStop: () => void
  isStreaming: boolean
  disabled?: boolean
  autoFocus?: boolean
}

export function ChatComposer({ onSend, onStop, isStreaming, disabled, autoFocus }: ChatComposerProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function resize(element: HTMLTextAreaElement) {
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT_PX)}px`
  }

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || isStreaming || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const canSend = value.trim().length > 0 && !isStreaming && !disabled

  return (
    <div className="flex items-center gap-2 rounded-xl border border-input bg-background p-2 pl-4 shadow-xs">
      <Textarea
        ref={textareaRef}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        rows={1}
        placeholder="Ask Spenza anything..."
        aria-label="Ask Spenza anything"
        className="min-h-11 resize-none border-0 bg-transparent px-1.5 py-3 shadow-none focus-visible:ring-0"
        onChange={(event) => {
          setValue(event.target.value)
          resize(event.target)
        }}
        onKeyDown={handleKeyDown}
      />
      {isStreaming ? (
        <Button type="button" size="icon-lg" variant="secondary" aria-label="Stop generating" onClick={onStop}>
          <Square className="size-3.5 fill-current" />
        </Button>
      ) : (
        <Button type="button" size="icon-lg" aria-label="Send message" disabled={!canSend} onClick={handleSend}>
          <ArrowUp className="size-4" />
        </Button>
      )}
    </div>
  )
}
