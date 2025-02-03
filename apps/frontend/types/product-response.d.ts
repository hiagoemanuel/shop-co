export interface ProductResponse {
  data: IProduct[]
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: MetaDataType
}

export interface IProduct {
  id: string
  name: string
  description: string | null
  AvgRating: number
  images: string[]
  dressStyle: 'casual' | 'formal' | 'party' | 'gym'
  type: 'tShirt' | 'short' | 'shirt' | 'hoodie' | 'jeans'
  sizes: ProductSizeType[]
  colors: ProductColorType[]
  price: number
  discount: number | null
  discountedPrice: number | null
  definedPrice: number
  amount: number
}

export type ProductSizeType =
  | 'xxSmall'
  | 'xSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xLarge'
  | 'xxLarge'
  | 'xxxLarge'
  | 'xxxxLarge'

export type ProductColorType =
  | 'beige'
  | 'black'
  | 'blue'
  | 'cyan'
  | 'grey'
  | 'green'
  | 'pink'
  | 'red'
  | 'white'
  | 'yellow'

export type MetaDataType = {
  path: string
  currentPage: number
  perPage: number
  total: number
  lastPage: number
  from: number
  to: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}
