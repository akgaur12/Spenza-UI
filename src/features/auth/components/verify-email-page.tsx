import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { AuthCard } from '@/components/common/auth-card'
import { AuthPageHeading, AuthPageLayout } from '@/components/common/auth-page-layout'
import { LoadingButton } from '@/components/common/loading-button'
import { Button } from '@/components/ui/button'
import { OtpInput } from '@/components/forms/otp-input'
import { useResendSignupOtpMutation, useVerifySignupOtpMutation } from '@/features/auth/hooks/use-auth-mutations'
import { otpFormSchema } from '@/features/auth/schemas/otp.schema'
import { useCountdown } from '@/hooks/use-countdown'

const RESEND_COOLDOWN_SECONDS = 60

export function VerifyEmailPage({ email }: { email: string }) {
  const navigate = useNavigate()
  const verifyMutation = useVerifySignupOtpMutation()
  const resendMutation = useResendSignupOtpMutation()
  const [otp, setOtp] = useState('')
  const { secondsLeft, isActive, restart } = useCountdown(RESEND_COOLDOWN_SECONDS)

  const validation = otpFormSchema.safeParse({ otp })
  const otpError = otp.length === 6 && !validation.success ? validation.error.issues[0]?.message : null

  function handleSubmit() {
    const parsed = otpFormSchema.safeParse({ otp })
    if (!parsed.success) {
      toast.error('Invalid code', { description: parsed.error.issues[0]?.message })
      return
    }
    verifyMutation.mutate({ email, otp: parsed.data.otp }, { onSuccess: () => navigate({ to: '/login' }) })
  }

  function handleResend() {
    resendMutation.mutate({ email }, { onSuccess: () => restart() })
  }

  return (
    <AuthPageLayout align="start">
      <AuthPageHeading title="Verify your email" description={`We've sent a 6-digit verification code to ${email}.`} />

      <AuthCard>
        <div className="space-y-6">
          <div className="space-y-2">
            <OtpInput value={otp} onChange={setOtp} autoFocus disabled={verifyMutation.isPending} />
            {otpError && <p className="text-center text-sm text-destructive">{otpError}</p>}
          </div>

          <LoadingButton
            className="w-full transition-opacity duration-300"
            disabled={otp.length !== 6}
            isLoading={verifyMutation.isPending}
            loadingText="Verifying..."
            onClick={handleSubmit}
          >
            Verify
          </LoadingButton>

          <div className="text-center text-sm text-muted-foreground">
            Didn't get a code?{' '}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm"
              disabled={isActive || resendMutation.isPending}
              onClick={handleResend}
            >
              {isActive ? `Resend in ${secondsLeft}s` : resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
            </Button>
          </div>
        </div>
      </AuthCard>
    </AuthPageLayout>
  )
}
