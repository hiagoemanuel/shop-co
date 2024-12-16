export interface IProduct {
  product: {
    name: string
    colors: string[]
    size: string[]
  }
  images: {
    main: string
    others: string[]
  }
  type: 't-shirt' | 'short' | 'shirt' | 'hoodie' | 'jeans'
  price: number
  rating: number
  discount: {
    status: boolean
    off: number
  }
}
