import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  length?: number
}

export function OtpInput({ value, onChange, disabled, autoFocus, length = 6 }: OtpInputProps) {
  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      pattern={REGEXP_ONLY_DIGITS}
      containerClassName="justify-center"
    >
      <InputOTPGroup>
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot key={index} index={index} className="size-11 text-base" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
