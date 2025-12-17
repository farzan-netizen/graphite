import { string, trim, minLength, email } from 'zod/mini'

const emailStringSchema = string().check(
  trim(),
  minLength(1, { message: 'Please fill in your email' }),
  email('This is not a valid email'),
)

export const isValidEmail = (email: string) => {
  const { success } = emailStringSchema.safeParse(email)
  return success
}

const personalEmailDomains: Set<string> = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'live.com',
  'gmx.de',
  'mail.ru',
])

export const isWorkEmail = (email: string) => {
  if (!isValidEmail(email)) {
    return false
  }
  const domain = email.split('@').pop()?.toLowerCase()
  return domain ? !personalEmailDomains.has(domain) : false
}

export const getEmailDomain = (email: string): string => {
  return email.split('@').pop()?.toLowerCase() ?? ''
}
