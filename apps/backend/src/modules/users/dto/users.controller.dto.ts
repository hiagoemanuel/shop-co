import { z } from 'zod'

const schemaUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
})
export type UserDto = z.infer<typeof schemaUser>

const schemaAccount = z.object({
  provider: z.string(),
  type: z.string(),
  providerAccountId: z.string(),
  scope: z.string(),
  access_token: z.string(),
  token_type: z.string(),
})
export type AccountDto = z.infer<typeof schemaAccount>

export const schemaCreateUser = z.object({
  user: schemaUser,
  account: schemaAccount,
})

export type CreateUserDto = z.infer<typeof schemaCreateUser>
