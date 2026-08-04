import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteAccountDialog } from '@/features/settings/components/delete-account-dialog'

export function DangerZoneCard() {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>
          Deleting your account permanently removes your account and associated data. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </CardFooter>

      <DeleteAccountDialog open={open} onOpenChange={setOpen} />
    </Card>
  )
}
