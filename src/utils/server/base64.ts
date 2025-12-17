import 'server-only'

export const encode = (str: string) => Buffer.from(str).toString('base64')

export const decode = (str: string) =>
  Buffer.from(str, 'base64').toString('ascii')
