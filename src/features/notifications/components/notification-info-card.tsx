import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NotificationInfoCardProps {
  title: string
  children: ReactNode
}

export function NotificationInfoCard({ title, children }: NotificationInfoCardProps) {
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  )
}
