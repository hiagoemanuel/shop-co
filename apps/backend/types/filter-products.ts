import { DressStyleType } from '@prisma/client'

export interface IFilterProducts {
  page: string | null
  search: string | null
  type: string | null
  price: string | null
  colors: string | null
  size: string | null
  style: DressStyleType | null
  sort: string | null
}
