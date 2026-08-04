import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { PasswordInput } from '@/components/forms/password-input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface PasswordFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  autoComplete?: string
  description?: string
}

export function PasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  autoComplete,
  description,
}: PasswordFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PasswordInput placeholder="••••••••" autoComplete={autoComplete} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
