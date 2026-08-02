import { Loader2 } from 'lucide-react'
import { Button, type buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

interface LoadingButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {isLoading ? (loadingText ?? children) : children}
    </Button>
  )
}
