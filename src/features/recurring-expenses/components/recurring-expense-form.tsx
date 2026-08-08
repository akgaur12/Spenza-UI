import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategories } from '@/features/categories/hooks/use-categories'
import { CategoryCombobox } from '@/features/expenses/components/category-combobox'
import {
  useCreateRecurringExpenseMutation,
  useUpdateRecurringExpenseMutation,
} from '@/features/recurring-expenses/hooks/use-recurring-expense-mutations'
import {
  recurringExpenseFormSchema,
  type RecurringExpenseFormValues,
} from '@/features/recurring-expenses/schemas/recurring-expense.schema'
import type { RecurringExpense } from '@/features/recurring-expenses/types'
import {
  FREQUENCY_OPTIONS,
  GENERATION_MODE_DESCRIPTIONS,
  GENERATION_MODE_OPTIONS,
} from '@/features/recurring-expenses/utils/labels'
import { useDebounce } from '@/hooks/use-debounce'

interface RecurringExpenseFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recurringExpense?: RecurringExpense
}

function getDefaultValues(recurringExpense?: RecurringExpense): RecurringExpenseFormValues {
  if (recurringExpense) {
    return {
      description: recurringExpense.description,
      category: {
        id: recurringExpense.category.id,
        name: recurringExpense.category.name,
        icon: recurringExpense.category.icon,
      },
      amount: recurringExpense.amount,
      frequency: recurringExpense.frequency,
      generationMode: recurringExpense.generation_mode,
      startDate: new Date(recurringExpense.start_date),
      endDate: recurringExpense.end_date ? new Date(recurringExpense.end_date) : null,
    }
  }
  return {
    description: '',
    category: { id: '', name: '', icon: null },
    amount: '',
    frequency: 'monthly',
    generationMode: 'auto',
    startDate: new Date(),
    endDate: null,
  }
}

function toIsoDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function RecurringExpenseForm({ open, onOpenChange, recurringExpense }: RecurringExpenseFormProps) {
  const mode = recurringExpense ? 'edit' : 'add'
  const [categorySearch, setCategorySearch] = useState('')
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const debouncedCategorySearch = useDebounce(categorySearch, 250)
  const categoriesQuery = useCategories({ search: debouncedCategorySearch || undefined })

  const createMutation = useCreateRecurringExpenseMutation()
  const updateMutation = useUpdateRecurringExpenseMutation()

  const form = useForm<RecurringExpenseFormValues>({
    resolver: zodResolver(recurringExpenseFormSchema),
    defaultValues: getDefaultValues(recurringExpense),
  })

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(recurringExpense))
      setCategorySearch('')
    }
  }, [open, recurringExpense, form])

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  function onSubmit(values: RecurringExpenseFormValues) {
    if (mode === 'add') {
      createMutation.mutate({
        category_id: values.category.id,
        description: values.description,
        amount: values.amount,
        frequency: values.frequency,
        generation_mode: values.generationMode,
        start_date: toIsoDate(values.startDate),
        end_date: values.endDate ? toIsoDate(values.endDate) : undefined,
      })
    } else if (recurringExpense) {
      updateMutation.mutate({
        recurringExpenseId: recurringExpense.id,
        payload: {
          category_id: values.category.id,
          description: values.description,
          amount: values.amount,
          frequency: values.frequency,
          generation_mode: values.generationMode,
          start_date: toIsoDate(values.startDate),
          end_date: values.endDate ? toIsoDate(values.endDate) : null,
        },
      })
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'New Recurring Expense' : 'Edit Recurring Expense'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Set up an expense that repeats automatically or reminds you when due.'
              : 'Update the details of this recurring expense.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Netflix, Rent, Gym…" autoFocus {...field} />
                  </FormControl>
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
                      selectedId={field.value.id || null}
                      displayName={field.value.name || undefined}
                      displayIcon={field.value.icon}
                      onSelect={(category) =>
                        field.onChange(
                          category
                            ? { id: category.id, name: category.name, icon: category.icon }
                            : { id: '', name: '', icon: null },
                        )
                      }
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FREQUENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generationMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generation Mode</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENERATION_MODE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">{GENERATION_MODE_DESCRIPTIONS[field.value]}</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button type="button" variant="outline" className="w-full justify-start font-normal">
                            <CalendarIcon className="size-4 text-muted-foreground" />
                            {format(field.value, 'd MMM yyyy')}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) field.onChange(date)
                            setStartDateOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (optional)</FormLabel>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button type="button" variant="outline" className="w-full justify-start font-normal">
                            <CalendarIcon className="size-4 text-muted-foreground" />
                            {field.value ? format(field.value, 'd MMM yyyy') : 'None'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => {
                            field.onChange(date ?? null)
                            setEndDateOpen(false)
                          }}
                          disabled={{ before: form.getValues('startDate') }}
                        />
                        {field.value && (
                          <div className="border-t border-border p-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                field.onChange(null)
                                setEndDateOpen(false)
                              }}
                            >
                              <X className="size-3.5" />
                              Clear end date
                            </Button>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <LoadingButton type="submit" isLoading={isSubmitting} loadingText={mode === 'add' ? 'Creating…' : 'Saving…'}>
                {mode === 'add' ? 'Create Recurring Expense' : 'Save Changes'}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
