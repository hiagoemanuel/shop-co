import { ProductColorType, ProductSizeType } from '@/types/product-response'

export interface ICartProducts {
  id: string
  name: string
  productId: string
  image: string
  size: ProductSizeType
  color: ProductColorType
  amount: number
  price: number
  discount: number | null
}
