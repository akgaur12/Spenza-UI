import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmailConfigCard } from '@/features/admin/components/email-tab/email-config-card'
import { SendAdminEmailDialog } from '@/features/admin/components/email-tab/send-admin-email-dialog'

export function EmailTab() {
  const [composeOpen, setComposeOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-medium text-foreground">Send email</p>
          <p className="text-sm text-muted-foreground">
            Compose a one-off email to specific users, delivered regardless of their notification preferences.
          </p>
        </div>
        <Button onClick={() => setComposeOpen(true)}>
          <Send className="size-4" />
          Compose
        </Button>
      </Card>

      <EmailConfigCard />

      <SendAdminEmailDialog open={composeOpen} onOpenChange={setComposeOpen} />
    </div>
  )
}
