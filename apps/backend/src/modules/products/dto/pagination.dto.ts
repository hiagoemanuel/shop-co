import { z } from 'zod'

export const schemaPaginationLinks = z.object({
  first: z.string().url(),
  last: z.string().url(),
  prev: z.string().url().nullable(),
  next: z.string().url().nullable(),
})
export type PaginationLinksDto = z.infer<typeof schemaPaginationLinks>

export const schemaMetaData = z.object({
  path: z.string().url(),
  currentPage: z.number(),
  perPage: z.number(),
  lastPage: z.number(),
  from: z.number(),
  to: z.number(),
  total: z.number(),
  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string(),
      active: z.boolean(),
    }),
  ),
})
export type MetaDataDto = z.infer<typeof schemaMetaData>
