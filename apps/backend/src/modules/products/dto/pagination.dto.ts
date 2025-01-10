import { z } from 'zod'

export const schemaPaginationLinks = z.object({
  first: z.string().url(),
  last: z.string().url(),
  prev: z.string().url().nullable(),
  next: z.string().url().nullable(),
})
export type PaginationLinksDto = z.infer<typeof schemaPaginationLinks>
