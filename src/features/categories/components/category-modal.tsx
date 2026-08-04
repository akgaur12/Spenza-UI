import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateCategoryMutation } from '@/features/categories/hooks/use-create-category-mutation'
import { useUpdateCategoryMutation } from '@/features/categories/hooks/use-update-category-mutation'
import { categoryFormSchema, type CategoryFormValues } from '@/features/categories/schemas/category.schema'
import type { CategoryListItem } from '@/features/categories/types'
import { getErrorCode } from '@/lib/errors'
import { toast } from 'sonner'

interface CategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: CategoryListItem
}

export function CategoryModal({ open, onOpenChange, category }: CategoryModalProps) {
  const mode = category ? 'edit' : 'create'
  const createMutation = useCreateCategoryMutation()
  const updateMutation = useUpdateCategoryMutation()
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: category?.name ?? '' },
  })

  useEffect(() => {
    if (open) form.reset({ name: category?.name ?? '' })
  }, [open, category, form])

  async function onSubmit(values: CategoryFormValues) {
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync({ name: values.name })
        toast.success('Category created')
      } else if (category) {
        await updateMutation.mutateAsync({ categoryId: category.id, payload: { name: values.name } })
        toast.success('Category updated')
      }
      onOpenChange(false)
    } catch (error) {
      if (getErrorCode(error) === 'CATEGORY_ALREADY_EXISTS') {
        form.setError('name', { message: 'A category with this name already exists.' })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Category' : 'Edit Category'}</DialogTitle>
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
