import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  useCreateAdminCategoryMutation,
  useUpdateAdminCategoryMutation,
} from '@/features/admin/hooks/use-admin-category-mutations'
import { adminCategoryFormSchema, type AdminCategoryFormValues } from '@/features/admin/schemas/admin-category.schema'
import type { SystemCategoryResponse } from '@/features/admin/types'
import { getErrorCode } from '@/lib/errors'

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: SystemCategoryResponse
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
  const mode = category ? 'edit' : 'create'
  const createMutation = useCreateAdminCategoryMutation()
  const updateMutation = useUpdateAdminCategoryMutation()
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const form = useForm<AdminCategoryFormValues>({
    resolver: zodResolver(adminCategoryFormSchema),
    defaultValues: { name: category?.name ?? '', icon: category?.icon ?? '' },
  })

  useEffect(() => {
    if (open) form.reset({ name: category?.name ?? '', icon: category?.icon ?? '' })
  }, [open, category, form])

  async function onSubmit(values: AdminCategoryFormValues) {
    const payload = { name: values.name, icon: values.icon || null }
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload)
        toast.success('Category created')
      } else if (category) {
        await updateMutation.mutateAsync({ categoryId: category.id, payload })
        toast.success('Category updated')
      }
      onOpenChange(false)
    } catch (error) {
      if (getErrorCode(error) === 'CATEGORY_ALREADY_EXISTS') {
        form.setError('name', { message: 'A category with this name already exists.' })
      }
    }
  }

  function handleActiveToggle(checked: boolean) {
    if (!category) return
    updateMutation.mutate({ categoryId: category.id, payload: { is_active: checked } })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create System Category' : 'Edit System Category'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Gym, Pets, Gaming" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (emoji, optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 🏋️" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === 'edit' && category && (
              <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <Label htmlFor="category-active">Active</Label>
                <Switch
                  id="category-active"
                  checked={category.is_active}
                  disabled={updateMutation.isPending}
                  onCheckedChange={handleActiveToggle}
                />
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <LoadingButton type="submit" isLoading={isSubmitting} loadingText="Saving…">
                {mode === 'create' ? 'Create' : 'Save Changes'}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
