import { useLocation } from '@tanstack/react-router'
import { Loader2, Sparkles } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { useAuth } from '@/features/auth/components/auth-provider'
import { cn } from '@/lib/utils'

/** Available on every authenticated page except the full /assistant route, where it would just float over itself. */
export function FloatingAIButton() {
  const { pathname } = useLocation()
  const { isPanelOpen, openPanel, streaming } = useAssistant()
  const { user } = useAuth()

  if (!user?.ai_assistant.enabled) return null
  if (pathname.startsWith('/assistant')) return null
  if (isPanelOpen) return null

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={openPanel}
          aria-label="Ask Spenza AI"
          className={cn(
            'fixed right-4 bottom-20 z-40 flex size-11 items-center justify-center rounded-full',
            'bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'md:right-6 md:bottom-6 md:size-14',
          )}
        >
          {streaming.state.isStreaming ? (
            <Loader2 className="size-5 animate-spin md:size-6" />
          ) : (
            <Sparkles className="size-5 md:size-6" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">Ask Spenza AI</TooltipContent>
    </Tooltip>
  )
}
