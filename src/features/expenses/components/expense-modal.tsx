import { zodResolver } from '@hookform/resolvers/zod'
import { format, isToday } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCategories } from '@/features/categories/hooks/use-categories'
import { useCreateCategoryMutation } from '@/features/categories/hooks/use-create-category-mutation'
import { CategoryCombobox } from '@/features/expenses/components/category-combobox'
import { useCreateExpenseMutation, useUpdateExpenseMutation } from '@/features/expenses/hooks/use-expense-mutations'
import { expenseFormSchema, type ExpenseFormValues } from '@/features/expenses/schemas/expense.schema'
import type { Expense } from '@/features/expenses/types'
import { buildSpentAt } from '@/features/expenses/utils/build-spent-at'
import { useDebounce } from '@/hooks/use-debounce'

interface ExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense?: Expense
}

function getDefaultValues(expense?: Expense): ExpenseFormValues {
  if (expense) {
    return {
      spentAt: new Date(expense.spent_at),
      category: { id: expense.category.id, name: expense.category.name, icon: expense.category.icon },
      description: expense.description,
      amount: expense.amount,
    }
  }
  return {
    spentAt: new Date(),
    category: { id: null, name: '', icon: null },
    description: '',
    amount: '',
  }
}

export function ExpenseModal({ open, onOpenChange, expense }: ExpenseModalProps) {
  const mode = expense ? 'edit' : 'add'
  const [categorySearch, setCategorySearch] = useState('')
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const debouncedCategorySearch = useDebounce(categorySearch, 250)
  const categoriesQuery = useCategories({ search: debouncedCategorySearch || undefined })

  const createCategoryMutation = useCreateCategoryMutation()
  const createExpenseMutation = useCreateExpenseMutation()
  const updateExpenseMutation = useUpdateExpenseMutation()

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: getDefaultValues(expense),
  })

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(expense))
      setCategorySearch('')
    }
  }, [open, expense, form])

  const isSubmitting = createCategoryMutation.isPending || createExpenseMutation.isPending || updateExpenseMutation.isPending

  async function onSubmit(values: ExpenseFormValues) {
    try {
      const categoryId =
        values.category.id ??
        (await createCategoryMutation.mutateAsync({ name: values.category.name, icon: values.category.icon })).id

      const payload = {
        category_id: categoryId,
        description: values.description,
        amount: values.amount,
        spent_at: buildSpentAt(values.spentAt, mode === 'edit' ? expense?.spent_at : undefined),
      }

      if (mode === 'add') {
        createExpenseMutation.mutate({
          payload,
          categoryPreview: { name: values.category.name, icon: values.category.icon },
        })
      } else if (expense) {
        updateExpenseMutation.mutate({ expenseId: expense.id, payload })
      }

      onOpenChange(false)
    } catch {
      // Category creation failure already surfaced via its own error toast — nothing further to do here.
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Log a new expense in a few seconds.' : 'Update the details of this expense.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="spentAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline" className="w-full justify-start font-normal" autoFocus>
                          <CalendarIcon className="size-4 text-muted-foreground" />
                          {isToday(field.value) ? 'Today' : format(field.value, 'EEE, d MMM yyyy')}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) field.onChange(date)
                          setDatePickerOpen(false)
                        }}
                        disabled={{ after: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryCombobox
                      categories={categoriesQuery.data?.items ?? []}
                      search={categorySearch}
                      onSearchChange={setCategorySearch}
                      selectedId={field.value.id}
                      displayName={field.value.name || undefined}
                      displayIcon={field.value.icon}
                      onSelect={(category) =>
                        field.onChange(category ? { id: category.id, name: category.name, icon: category.icon } : null)
                      }
                      allowCreate
                      onCreateRequest={(name) => field.onChange({ id: null, name, icon: null })}
                      placeholder="Select category"
                      className="w-full"
                      avoidPortal
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Cake, Uber, Coffee…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xl font-semibold text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        {...field}
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        className="h-14 pl-8 text-2xl font-bold tabular-nums"
                      />
                    </div>
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
                {mode === 'add' ? 'Add Expense' : 'Save Changes'}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
