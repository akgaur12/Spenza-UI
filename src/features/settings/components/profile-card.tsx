import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { ProfileAvatar } from '@/components/layout/profile-avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import type { UserMe } from '@/features/auth/types'
import { EditableField } from '@/features/settings/components/editable-field'
import { ReadonlyField } from '@/features/settings/components/readonly-field'
import { useUpdateProfileMutation, useUpdateUsernameMutation } from '@/features/settings/hooks/use-user-mutations'
import { profileSchema, type ProfileFormValues } from '@/features/settings/schemas/profile.schema'

interface ProfileCardProps {
  user: UserMe
  onDirtyChange: (dirty: boolean) => void
}

export function ProfileCard({ user, onDirtyChange }: ProfileCardProps) {
  const updateProfileMutation = useUpdateProfileMutation()
  const updateUsernameMutation = useUpdateUsernameMutation()
  const isSaving = updateProfileMutation.isPending || updateUsernameMutation.isPending

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { fullName: user.full_name ?? '', username: user.username },
  })

  const { isDirty, isValid, dirtyFields } = form.formState
  useEffect(() => {
    onDirtyChange(isDirty)
  }, [isDirty, onDirtyChange])

  async function onSubmit(values: ProfileFormValues) {
    const tasks: Promise<unknown>[] = []
    if (dirtyFields.fullName) tasks.push(updateProfileMutation.mutateAsync({ full_name: values.fullName }))
    if (dirtyFields.username) tasks.push(updateUsernameMutation.mutateAsync({ new_username: values.username }))

    try {
      await Promise.all(tasks)
      form.reset(values)
    } catch {
      // Individual mutations already toast their own errors — keep the form dirty so Save stays enabled to retry.
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <ProfileAvatar user={user} className="size-16" />
              <p className="text-sm text-muted-foreground">Profile photo support coming soon.</p>
            </div>

            <EditableField
              control={form.control}
              name="fullName"
              label="Full Name"
              autoComplete="name"
              disabled={isSaving}
            />
            <EditableField
              control={form.control}
              name="username"
              label="Username"
              autoComplete="username"
              disabled={isSaving}
              description="3–30 characters. Letters, numbers, underscores and periods only — no spaces."
            />
            <ReadonlyField
              label="Email"
              value={user.email}
              badge={
                user.is_verified ? (
                  <Badge variant="secondary" className="text-success">
                    Verified ✓
                  </Badge>
                ) : (
                  <Badge variant="outline">Unverified</Badge>
                )
              }
            />
          </CardContent>
          <CardFooter>
            <LoadingButton
              type="submit"
              isLoading={isSaving}
              loadingText="Saving..."
              disabled={!isDirty || !isValid}
            >
              Save Changes
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
