export interface IProduct {
  id: string
  name: string
  description: string | null
  AVGrating: number
  images: string[]
  dressStyle: string
  type: string
  sizes: string[]
  colors: string[]
  price: number
  discount: number | null
  amount: number
}
