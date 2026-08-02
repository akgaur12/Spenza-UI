import { z } from 'zod'

export const emailSchema = z.string().trim().min(1, 'Email is required').email('Enter a valid email address')

export const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_.]+$/, 'Only letters, numbers, "_" and "." are allowed — no spaces')

/** Backend requires 8-128 chars; a few extra client-side checks push users toward a stronger password. */
export const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[0-9]/, 'Include at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Include at least one special character')

export const otpSchema = z
  .string()
  .trim()
  .length(6, 'Enter the 6-digit code')
  .regex(/^\d+$/, 'Code must contain only digits')
