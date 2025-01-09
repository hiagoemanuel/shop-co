import {
  ColorsType,
  DressStyleType,
  ProductType,
  SizesType,
} from '@prisma/client'
import { z } from 'zod'

export const schemaProductFilter = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
  type: z.string().optional(),
  price: z.string().optional(),
  colors: z.string().optional(),
  size: z.string().optional(),
  style: z.string().optional(),
  sort: z.string().optional(),
})
export type ProductFilterDto = z.infer<typeof schemaProductFilter>

export const schemaProductFilterTrasformed = z.object({
  page: z.number().optional(),
  search: z.string().optional(),
  type: z.array(z.custom<ProductType>()).optional(),
  price: z.tuple([z.number(), z.number()]).optional(),
  colors: z.array(z.custom<ColorsType>()).optional(),
  size: z.array(z.custom<SizesType>()).optional(),
  style: z.custom<DressStyleType>().optional(),
  sort: z.union([
    z.literal('name'),
    z.literal('-name'),
    z.literal('price'),
    z.literal('-price'),
    z.literal('AVGrating'),
    z.literal('-AVGrating'),
  ]),
})
export type ProductFilterTransformedDto = z.infer<
  typeof schemaProductFilterTrasformed
>
