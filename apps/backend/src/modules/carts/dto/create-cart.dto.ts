import { ColorsType, SizesType } from '@prisma/client'

export interface CreateCartDto {
  userId: string
  productId: string
  amount: number
  color: ColorsType
  size: SizesType
}
