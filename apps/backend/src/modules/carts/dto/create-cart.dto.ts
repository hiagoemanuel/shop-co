import { ColorsType, SizesType } from '@prisma/client'

export interface CreateCartDto {
  accountId: string
  productId: string
  amount: number
  color: ColorsType
  size: SizesType
}
