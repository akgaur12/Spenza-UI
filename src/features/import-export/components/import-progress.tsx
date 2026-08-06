import { Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ImportProgressProps {
  percent: number
  fileName: string
}

/**
 * `percent` here is a simulated ramp, not real byte progress — the confirm endpoint is a single
 * fast JSON call with no progress signal (the file itself was already uploaded during Preview).
 */
export function ImportProgress({ percent, fileName }: ImportProgressProps) {
  return (
    <div className="space-y-4 py-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="font-medium">Importing your expenses…</p>
        <p className="text-sm text-muted-foreground">{fileName}</p>
      </div>
      <div className="mx-auto max-w-sm space-y-1.5">
        <Progress value={percent} />
        <p className="text-right text-xs tabular-nums text-muted-foreground">{percent}%</p>
      </div>
    </div>
  )
}
