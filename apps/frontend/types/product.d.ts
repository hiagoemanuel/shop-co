export interface IProduct {
  id: string
  name: string
  description: string | null
  AVGrating: number
  images: string[]
  dressStyle: DressStyleType
  type: ProductType
  sizes: SizesType[]
  colors: ColorsType[]
  price: number
  discount: number | null
  amount: number
}
