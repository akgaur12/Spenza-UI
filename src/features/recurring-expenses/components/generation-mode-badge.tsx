import { Bell, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { GenerationMode } from '@/features/recurring-expenses/types'
import { GENERATION_MODE_DESCRIPTIONS, generationModeLabel } from '@/features/recurring-expenses/utils/labels'

interface GenerationModeBadgeProps {
  mode: GenerationMode
  className?: string
}

export function GenerationModeBadge({ mode, className }: GenerationModeBadgeProps) {
  const Icon = mode === 'auto' ? Zap : Bell

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className={className}>
          <Icon className="size-3" />
          {generationModeLabel(mode)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{GENERATION_MODE_DESCRIPTIONS[mode]}</TooltipContent>
    </Tooltip>
  )
}
