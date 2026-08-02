import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  comingSoon?: boolean
}

export function FeatureCard({ icon: Icon, title, description, comingSoon }: FeatureCardProps) {
  return (
    <Card className="h-full gap-3 border-border/70 py-4 shadow-none transition-colors hover:border-primary/40 sm:gap-6 sm:py-6">
      <CardContent className="space-y-2 px-4 sm:space-y-3 sm:px-6">
        <div className="flex items-center justify-between">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent sm:size-10">
            <Icon className="size-4 text-accent-foreground sm:size-5" />
          </span>
          {comingSoon && (
            <Badge variant="secondary" className="text-xs font-medium">
              Coming soon
            </Badge>
          )}
        </div>
        <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
