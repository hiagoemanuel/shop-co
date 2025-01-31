import { ColorsType, SizesType } from '@prisma/client'

export interface FindCartDto {
  id: string
  name: string
  productId: string
  image: string
  size: SizesType
  color: ColorsType
  amount: number
  price: number
  discount: number | null
}
