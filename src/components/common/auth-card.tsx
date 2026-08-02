import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthCardProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        {footer && <div className="pt-2 text-center text-sm text-muted-foreground">{footer}</div>}
      </CardContent>
    </Card>
  )
}
